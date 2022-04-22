import {
	Mesh,
	PlaneGeometry,
	MeshBasicMaterial,
	DoubleSide,
	Color,
	BoxGeometry
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


export interface IBoxBloomedGUIProperties extends GUIProperties {
	readonly visible: IGUIBooleanProperty
	readonly width: IGUINumberProperty
	readonly height: IGUINumberProperty
	readonly length: IGUINumberProperty
	readonly color: IGUIColorProperty
	readonly opacity: IGUINumberProperty
}

export interface IBoxBloomedProps extends IPropsWithGUIOptions<IBoxBloomedGUIProperties> {
	readonly visible?: boolean
	readonly width: number
	readonly height: number
	readonly length: number
	readonly color: number
	readonly transparent?: boolean
	readonly opacity?: number
}

export class BoxBloomed extends SceneNode<Mesh> {
	private readonly _initialWidth: number
	private readonly _initialHeight: number
	private readonly _initialLength: number
	private _color: number
	protected readonly _gui: IWithGUI

	constructor(props: IBoxBloomedProps) {
		super(new Mesh(
			new BoxGeometry(props.width, props.height, props.length),
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
		this._initialLength = props.length || 1


		this._color = props.color
		this._gui = WithGUI.createAndApply(this, props, {
			visible: { type: "boolean" },
			width: { type: "number" },
			height: { type: "number" },
			length: { type: "number" },
			color: { type: "color" },
			opacity: { type: "number", min: 0, max: 1, step: .01 },
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
		(this._obj3D.material as MeshBasicMaterial).color.set(new Color(this._color))
	}
	get opacity () { return (this._obj3D.material as MeshBasicMaterial).opacity }
	set opacity (v: number) {
		(this._obj3D.material as MeshBasicMaterial).opacity = v
	}
}