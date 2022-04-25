import {
	Mesh,
	BoxGeometry,
	MeshLambertMaterial,
	Color
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


export interface IPlayerBodyGUIProperties extends GUIProperties {
	readonly visible: IGUIBooleanProperty
	readonly width: IGUINumberProperty
	readonly height: IGUINumberProperty
	readonly length: IGUINumberProperty
	readonly color: IGUIColorProperty
}

export interface IPlayerBodyProps extends IPropsWithGUIOptions<IPlayerBodyGUIProperties> {
	readonly visible?: boolean
	readonly width?: number
	readonly height?: number
	readonly length?: number
	readonly color?: number
}

export default class Body extends SceneNode<Mesh> {
	private readonly _initialWidth: number
	private readonly _initialHeight: number
	private readonly _initialLength: number
	private _color: number
	protected readonly _gui: IWithGUI

	constructor (props: IPlayerBodyProps) {
		const initialWidth = props.width ?? 1
		const initialHeight = props.height ?? 1.5
		const initialLength = props.length ?? 1
		const color = props.color ?? 0xffffff
		super(new Mesh(
			new BoxGeometry(
				initialWidth,
				initialHeight,
				initialLength
			),
			new MeshLambertMaterial({
				color,
				visible: props.visible ?? true
			})
		))
		this._initialWidth = initialWidth
		this._initialHeight = initialHeight
		this._initialLength = initialLength
		this._color = color
		this._gui = WithGUI.createAndApply(this, props, {
			visible: { type: "boolean" },
			width: { type: "number", min: 0, max: 5, step: .05 },
			height: { type: "number", min: .05, max: 1, step: .05 },
			length: { type: "number", min: 10, max: 200, step: .1 },
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
		this._color = Math.max(0, c);
		(this._obj3D.material as MeshLambertMaterial).color.set(new Color(this._color))
	}
}