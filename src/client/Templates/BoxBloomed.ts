import {
	Mesh,
	MeshBasicMaterial,
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
	readonly x: IGUINumberProperty
	readonly y: IGUINumberProperty
	readonly z: IGUINumberProperty
	readonly xRotation: IGUINumberProperty
	readonly yRotation: IGUINumberProperty
	readonly zRotation: IGUINumberProperty
	readonly xScale: IGUINumberProperty
	readonly yScale: IGUINumberProperty
	readonly zScale: IGUINumberProperty
}

export interface IBoxBloomedProps extends IPropsWithGUIOptions<IBoxBloomedGUIProperties> {
	readonly visible?: boolean
	readonly width?: number
	readonly height?: number
	readonly length?: number
	readonly color?: number
	readonly transparent?: boolean
	readonly opacity?: number
	readonly x?: number
	readonly y?: number
	readonly z?: number
	readonly xRotation?: number
	readonly yRotation?: number
	readonly zRotation?: number
	readonly xScale?: number
	readonly yScale?: number
	readonly zScale?: number
}

export class BoxBloomed extends SceneNode<Mesh> {
	private readonly _initialWidth: number
	private readonly _initialHeight: number
	private readonly _initialLength: number
	private _color: number
	protected readonly _gui: IWithGUI

	constructor(props: IBoxBloomedProps) {
		const initialWidth = props.width ?? 1
		const initialHeight = props.height ?? 1
		const initialLength = props.length ?? 1
		const color = props.color ?? 0xffffff
		super(new Mesh(
			new BoxGeometry(initialWidth, initialHeight, initialLength),
			new MeshBasicMaterial({
				color,
				//side: DoubleSide,	// <- Ne specifier DoubleSide que quand c'est indispensable (perfs)
				visible: props.visible ?? true,
				transparent: props.transparent ?? false,
				opacity: props.opacity ?? 1
			})
		))
		this._initialWidth = initialWidth
		this._initialHeight = initialHeight
		this._initialLength = initialLength
		this._obj3D.layers.enable(1)
		typeof props.x === "number" && (this._obj3D.position.x = props.x)
		typeof props.y === "number" && (this._obj3D.position.y = props.y)
		typeof props.z === "number" && (this._obj3D.position.z = props.z)
		typeof props.xRotation === "number" && (this._obj3D.rotation.x = props.xRotation)
		typeof props.yRotation === "number" && (this._obj3D.rotation.y = props.yRotation)
		typeof props.zRotation === "number" && (this._obj3D.rotation.z = props.zRotation)
		typeof props.xScale === "number" && (this._obj3D.scale.x = props.xScale)
		typeof props.yScale === "number" && (this._obj3D.scale.y = props.yScale)
		typeof props.zScale === "number" && (this._obj3D.scale.z = props.zScale)
		this._color = color
		this._gui = WithGUI.createAndApply(this, props, {
			visible: { type: "boolean" },
			width: { type: "number", min: 0, max: 200, step: .05 },
			height: { type: "number", min: 0, max: 200, step: .05 },
			length: { type: "number", min: 0, max: 200, step: .05 },
			color: { type: "color" },
			opacity: { type: "number", min: 0, max: 1, step: .01 },
			x: { type: "number" },
			y: { type: "number" },
			z: { type: "number" },
			xRotation: { type: "number" },
			yRotation: { type: "number" },
			zRotation: { type: "number" },
			xScale: { type: "number" },
			yScale: { type: "number" },
			zScale: { type: "number" },
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
	get x () { return this._obj3D.position.x }
	get y () { return this._obj3D.position.y }
	get z () { return this._obj3D.position.z }
	get xRotation () { return this._obj3D.rotation.x }
	get yRotation () { return this._obj3D.rotation.y }
	get zRotation () { return this._obj3D.rotation.z }
	get xScale () { return this._obj3D.scale.x }
	get yScale () { return this._obj3D.scale.y }
	get zScale () { return this._obj3D.scale.z }
	set x (v: number) { this._obj3D.position.x = v}
	set y (v: number) { this._obj3D.position.y = v}
	set z (v: number) { this._obj3D.position.z = v}
	set xRotation (v: number) { this._obj3D.rotation.x = v}
	set yRotation (v: number) { this._obj3D.rotation.y = v}
	set zRotation (v: number) { this._obj3D.rotation.z = v}
	set xScale (v: number) { this._obj3D.scale.x = v}
	set yScale (v: number) { this._obj3D.scale.y = v}
	set zScale (v: number) { this._obj3D.scale.z = v}
}