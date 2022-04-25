import {
	Mesh,
	BoxGeometry,
	MeshLambertMaterial
} from "three"
import {
	GUIProperties,
	IGUIBooleanProperty,
	IGUINumberProperty,
	IGUIColorProperty,
	IPropsWithGUIOptions,
	IWithGUI,
	WithGUI
} from "../../Components"
import { SceneNode } from "../../Templates/SceneNode"


export interface IPlayerLeftArmGUIProperties extends GUIProperties {
	readonly visible: IGUIBooleanProperty
	readonly width: IGUINumberProperty
	readonly height: IGUINumberProperty
	readonly length: IGUINumberProperty
	readonly color: IGUIColorProperty
}

export interface IPlayerLeftArmProps extends IPropsWithGUIOptions<IPlayerLeftArmGUIProperties> {
	readonly visible?: boolean
	readonly width?: number
	readonly height?: number
	readonly length?: number
	readonly color?: number
}

export default class LeftArm extends SceneNode<Mesh> {
	private readonly _initialWidth: number
	private readonly _initialHeight: number
	private readonly _initialLength: number
	private _color: number
	protected readonly _gui: IWithGUI

	constructor (props: IPlayerLeftArmProps) {
		const initialWidth = props.width ?? 0.25
		const initialHeight = props.height ?? 1
		const initialLength = props.length ?? 0.25
		const color = props.color ?? 0xea80fc
		super(new Mesh(
			new BoxGeometry(
				initialWidth,
				initialHeight,
				initialLength
			),
			new MeshLambertMaterial({
				color
			})
		))
		this._initialWidth = initialWidth
		this._initialHeight = initialHeight
		this._initialLength = initialLength
		this._color = color
		this._obj3D.position.x = -1
		this._obj3D.position.y = .3
		this._obj3D.rotation.z = -Math.PI / 6
		this._gui = WithGUI.createAndApply(this, props, {
			visible: { type: "boolean" },
			width: { type: "number", min: .05, max: 1, step: .05 },
			height: { type: "number", min: .05, max: 1, step: .05 },
			length: { type: "number", min: .05, max: 2, step: .05 },
			color: { type: "color" }
		})
	}

	get visible () { return this._obj3D.visible }
	set visible (v: boolean) { this._obj3D.visible = v }
	get width () { return this._obj3D.scale.x * this._initialWidth }
	set width (x: number) { this._obj3D.scale.x = x / this._initialWidth }
	get height () { return this._obj3D.scale.y * this._initialHeight }
	set height (y: number) { this._obj3D.scale.y = y / this._initialHeight }
	get length () { return this._obj3D.scale.z * this._initialLength }
	set length (y: number) { this._obj3D.scale.z = y / this._initialLength }
	get color () { return this._color }
	set color (c: number) {
		this._color = Math.min(0xffffff, Math.max(0, c));
		(this._obj3D.material as MeshLambertMaterial).color.set(this._color)
	}
}