import {
	Mesh,
	PlaneGeometry,
	MeshBasicMaterial,
	DoubleSide,
	Color,
	MeshPhysicalMaterial
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
	readonly reflectivity: IGUINumberProperty
	readonly transmission: IGUINumberProperty
	readonly roughness: IGUINumberProperty
	readonly metalness: IGUINumberProperty
	readonly clearcoat: IGUINumberProperty
	readonly clearcoatRoughness: IGUINumberProperty
	readonly ior: IGUINumberProperty
}

export interface IPlatformProps extends IPropsWithGUIOptions<IPlatformGUIProperties> {
	readonly visible?: boolean
	readonly width: number
	readonly height: number
	readonly color: number
	readonly transparent?: boolean
	readonly opacity?: number
	readonly reflectivity: number
	readonly transmission: number
	readonly roughness: number
	readonly metalness: number
	readonly clearcoat: number
	readonly clearcoatRoughness: number
	readonly ior: number
}

export class Platform extends SceneNode<Mesh> {
	private readonly _initialWidth: number
	private readonly _initialHeight: number
	private _color: number
	protected readonly _gui: IWithGUI

	constructor(props: IPlatformProps) {
		super(new Mesh(
			new PlaneGeometry(props.width, props.height),
			new MeshPhysicalMaterial({
				color: props.color,
				side: DoubleSide,
				visible: props.visible ?? true,
				transparent: props.transparent ?? false,
				opacity: props.opacity ?? 1,
				reflectivity: props.reflectivity ?? 0,
				transmission: props.transmission ?? 0,
				roughness: props.roughness ?? 0,
				metalness: props.metalness ?? 0,
				clearcoat: props.clearcoat ?? 0,
				clearcoatRoughness: props.clearcoatRoughness ?? 0,
				ior: props.ior ?? 1
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
			opacity: { type: "number", min: 0, max: 1, step: .01 },
			reflectivity: { type: "number", min: 0, max: 1, step: .01 },
			transmission: { type: "number", min: 0, max: 1, step: .01 },
			roughness: { type: "number", min: 0, max: 1, step: .01 },
			metalness: { type: "number", min: 0, max: 1, step: .01 },
			clearcoat: { type: "number", min: 0, max: 1, step: .01 },
			clearcoatRoughness: { type: "number", min: 0, max: 1, step: .01 },
			ior: { type: "number", min: 0, max: 1, step: .01 }
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
	get reflectivity () { return (this._obj3D.material as MeshPhysicalMaterial).reflectivity }
	set reflectivity (v: number) {
		(this._obj3D.material as MeshPhysicalMaterial).reflectivity = v
	}
	get transmission () { return (this._obj3D.material as MeshPhysicalMaterial).transmission }
	set transmission (v: number) {
		(this._obj3D.material as MeshPhysicalMaterial).transmission = v
	}
	get roughness () { return (this._obj3D.material as MeshPhysicalMaterial).roughness }
	set roughness (v: number) {
		(this._obj3D.material as MeshPhysicalMaterial).roughness = v
	}
	get metalness () { return (this._obj3D.material as MeshPhysicalMaterial).metalness }
	set metalness (v: number) {
		(this._obj3D.material as MeshPhysicalMaterial).metalness = v
	}
	get clearcoat () { return (this._obj3D.material as MeshPhysicalMaterial).clearcoat }
	set clearcoat (v: number) {
		(this._obj3D.material as MeshPhysicalMaterial).clearcoat = v
	}
	get clearcoatRoughness () { return (this._obj3D.material as MeshPhysicalMaterial).clearcoatRoughness }
	set clearcoatRoughness (v: number) {
		(this._obj3D.material as MeshPhysicalMaterial).clearcoatRoughness = v
	}
	get ior () { return (this._obj3D.material as MeshPhysicalMaterial).ior }
	set ior (v: number) {
		(this._obj3D.material as MeshPhysicalMaterial).ior = v
	}
	
}