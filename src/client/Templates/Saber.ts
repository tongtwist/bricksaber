import {
	Group,
	Object3D,
	Vector3,
	Euler
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
	WithGUI
} from "../Components"
import { SceneNode } from "./SceneNode"


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
	private _manche?: Object3D
	private _lame?: Object3D
	private _savedPos?: Vector3
	private _savedRot?: Euler

	protected constructor (
		props: ISaberProps
	) {
		super(new Group())
		this._initialWidth = props.width ?? 1
		this._initialHeight = props.height ?? 1
		this._initialLength = props.length ?? 1
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

	private _setChildren(children: ISaberChildren) {
		if (typeof this._manche === "undefined") {
			if (children.manche) {
				this._manche = children.manche
				this._obj3D.add(this._manche)
			}
			if (children.lame) {
				this._lame = children.lame
				this._obj3D.add(this._lame)
			}
		}
	}

	protected async _loadModel (
		gltfLoader: GLTFLoader,
		url: string,
		name: string
	): Promise<void> {
		const model: GLTF = await gltfLoader.loadAsync(
			url,
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
				this._savedPos!.x,
				this._savedPos!.y,
				this._savedPos!.z
			)
		}
		if (this._savedRot) {
			this._savedRot!.x,
			this._savedRot!.y,
			this._savedRot!.z
		}
		this._obj3D.scale.x = 1
		this._obj3D.scale.y = 1
		this._obj3D.scale.z = 1
	}

	static async create (
		props: ISaberProps,
		gltfLoader: GLTFLoader
	): Promise<Saber> {
		const result = new Saber(props)
		await result._loadModel(
			gltfLoader,
			props.modelUrl ?? "/assets/models/redSaber.gltf",
			props.name
		)
		return result
	}
}