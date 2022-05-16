import {
	Group,
	Object3D,
	Vector3,
	Euler,
	Intersection
} from "three"
import type {
	GLTF,
	GLTFLoader
} from "three/examples/jsm/loaders/GLTFLoader"
import {
	GUIProperties,
	IGUIBooleanProperty,
	IGUINumberProperty,
	IPropsWithGUIOptions,
	IWithGUI,
	WithGUI,
	Intersections
} from "../../Components"
import { SceneNode } from "../SceneNode"


export interface ISaberGUIProperties extends GUIProperties {
	readonly visible: IGUIBooleanProperty
    readonly width: IGUINumberProperty
    readonly height: IGUINumberProperty
    readonly length: IGUINumberProperty
}

export interface ISaberProps extends IPropsWithGUIOptions<ISaberGUIProperties> {
	readonly modelUrl?: string
	readonly visible?: boolean
    readonly width?: number
    readonly height?: number
    readonly length?: number
	readonly hand: Group
}

interface ISaberChildren {
	manche?: Object3D
	lame?: Object3D
}

export class Saber extends SceneNode<Group> {
	protected readonly _gui: IWithGUI
	private readonly _initialWidth: number
	private readonly _initialHeight: number
	private readonly _initialLength: number
	private readonly _hand: Group
	private readonly _oldHandPosition: Vector3
	private readonly _handTranslation: Vector3
	private _touchSensor?: Intersections
	private _manche?: Object3D
	private _lame?: Object3D
	private _pit?: Object3D
	private readonly _pitPosition: Vector3
	private _savedPos?: Vector3
	private _savedRot?: Euler
	private _collidableObjects: Array<Object3D>
	private _collidableChildren: boolean

	protected constructor (
		props: ISaberProps
	) {
		super(new Group())
		this._initialWidth = props.width ?? 1
		this._initialHeight = props.height ?? 1
		this._initialLength = props.length ?? 1
		this._hand = props.hand
		this._oldHandPosition = new Vector3()
		this._handTranslation = new Vector3()
		this._pitPosition = new Vector3()
		this._collidableObjects = []
		this._collidableChildren = false
		this._gui = WithGUI.create(props)
	}

	get visible () { return this._obj3D.visible }
	set visible (v: boolean) { this._obj3D.visible = v }
	get width () { return this._obj3D.scale.x * this._initialWidth }
	set width (x: number) { this._obj3D.scale.x = x / this._initialWidth }
	get height () { return this._obj3D.scale.y * this._initialHeight }
	set height (y: number) { this._obj3D.scale.y = y / this._initialHeight }
	get length () { return this._obj3D.scale.z * this._initialLength }
	set length (y: number) { this._obj3D.scale.z = y / this._initialLength }
	get handlePosition () { return this._hand.position }
	get oldHandlePosition () { return this._oldHandPosition }
	get pitPosition () { return this._pitPosition }
	get pit () { return this._pit }

	private _setChildren ( children: ISaberChildren ) {
		if (typeof this._manche === "undefined" && children.manche) {
			this._manche = children.manche
			this._obj3D.add(this._manche)
		}
		if (typeof this._lame === "undefined" && children.lame) {
			const lame = children.lame
			this._lame = lame
			this._obj3D.add(this._lame)
			this._pit = lame.children[0].name === "Pointe" ? lame.children[0] : lame.children[1]
			this._touchSensor = new Intersections({
				from: this._hand.position,
				to: this._pitPosition,
				near: 0,
				far: 1.1,
				testChildren: true
			})
			this.setCollidables(
				this._collidableObjects,
				this._collidableChildren
			)
		}
	}

	protected async _loadModel (
		gltfLoader: GLTFLoader,
		url: string,
		name: string
	): Promise<void> {
		const model: GLTF = await gltfLoader.loadAsync(url,
			(progress) => console.log(`Scene->Player->"${name}": model load progress: ${JSON.stringify(progress)}`)
		)
		let child: Object3D | undefined
		const children: ISaberChildren = {}
		while (model.scene.children.length > 0) {
			child = model.scene.children.pop()
			if (child) {
				if (child.name === "Manche") {
					children.manche = child
				} else if (child.name === "Lame") {
					child.layers.enable(1)
					children.lame = child
				}
			}
		}
		this._setChildren(children)
	}

	enterVR () {
		this._savedPos = this._obj3D.position.clone()
		this._savedRot = this._obj3D.rotation.clone()
		this._obj3D.position.set(0, 0, 0)
		this._obj3D.rotation.set(-Math.PI / 2, 0, 0)
		this._obj3D.scale.x = .5
		this._obj3D.scale.y = .5
		this._obj3D.scale.z = .5
	}

	leaveVR () {
		if (this._savedPos) {
			this._obj3D.position.set(
				this._savedPos.x,
				this._savedPos.y,
				this._savedPos.z
			)
		}
		if (this._savedRot) {
			this._obj3D.rotation.set(
				this._savedRot.x,
				this._savedRot.y,
				this._savedRot.z
			)
		}
		this._obj3D.scale.x = 1
		this._obj3D.scale.y = 1
		this._obj3D.scale.z = 1
	}

	setCollidables (objects: Array<Object3D>, withChildren: boolean = false) {
		if (this._touchSensor) {
			this._touchSensor.objectsToTest = objects
		}
		this._collidableObjects = objects
		this._collidableChildren = withChildren
	}

	computePitPosition () {
		this._handTranslation.copy(this._hand.position)
		this._handTranslation.sub(this._oldHandPosition)
		if (this._pit) {
			this._pit.updateMatrixWorld(true)
			this._pitPosition.setFromMatrixPosition(this._pit.matrixWorld)
			this._pitPosition.add(this._handTranslation)
		}
	}

	collisions (): Array<Intersection<Object3D>> {
		if (!this._touchSensor || this._collidableObjects.length === 0) {
			return []
		}
		return this._touchSensor.listNew(this._collidableChildren)
	}

	saveHandPosition() {
		this._oldHandPosition.copy(this._hand.position)
	}
}