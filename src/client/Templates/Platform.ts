import {
	Mesh,
	PlaneGeometry,
	MeshBasicMaterial,
	DoubleSide,
	Color
} from "three"

import {
	GUIProperties,
	IGUIBooleanProperty,
	IGUIColorProperty,
	IGUINumberProperty,
	IPropsWithGUIOptions,
	IWithGUI,
	WithGUI
} from "../Components"
import { SceneNode } from "./SceneNode"


export interface IPlatformGUIProperties extends GUIProperties {
	readonly visible: IGUIBooleanProperty
	readonly width: IGUINumberProperty
	readonly height: IGUINumberProperty
	readonly color: IGUIColorProperty
	readonly opacity: IGUINumberProperty
}

export interface IPlatformProps extends IPropsWithGUIOptions<IPlatformGUIProperties> {
	readonly visible?: boolean
	readonly width: number
	readonly height: number
	readonly color: number
	readonly transparent?: boolean
	readonly opacity?: number
}

export class Platform extends SceneNode<Mesh> {
	private readonly _initialWidth: number
	private readonly _initialHeight: number
	private _color: number
	protected readonly _gui: IWithGUI

	constructor(props: IPlatformProps) {
		super(new Mesh(
			new PlaneGeometry(props.width, props.height),
			new MeshBasicMaterial({
				color: props.color,
				side: DoubleSide,
				visible: props.visible ?? true,
				transparent: props.transparent ?? false,
				opacity: props.opacity ?? 1
			})
		))
		this._initialWidth = props.width || 1
		this._initialHeight = props.height || 1
		this._color = props.color
		this._gui = WithGUI.createAndApply(this, props, {
			visible: { type: "boolean" },
			width: { type: "number" },
			height: { type: "number" },
			color: { type: "color" },
			opacity: { type: "number", min: 0, max: 1, step: .01 }
		})
	}

	get visible () { return this._obj3D.visible }
	set visible (v: boolean) { this._obj3D.visible = v }
	get width () { return this._obj3D.scale.x * this._initialWidth }
	set width (x: number) { this._obj3D.scale.x = x / this._initialWidth }
	get height () { return this._obj3D.scale.y * this._initialHeight }
	set height (y: number) { this._obj3D.scale.y = y / this._initialHeight }
	get color () { return this._color }
	set color (c: number) {
		this._color = Math.max(0, c);
		(this._obj3D.material as MeshBasicMaterial).color.set(new Color(this._color))
	}
	get opacity () { return (this._obj3D.material as MeshBasicMaterial).opacity }
	set opacity (v: number) {
		(this._obj3D.material as MeshBasicMaterial).opacity = v
	}
}