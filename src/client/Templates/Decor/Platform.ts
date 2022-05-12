import {
	Mesh,
	Color,
	MeshBasicMaterial,
	BoxGeometry,
	TextureLoader,
	RepeatWrapping,
	MeshStandardMaterial
} from "three"

import {
	GUIProperties,
	IGUIBooleanProperty,
	IGUIColorProperty,
	IGUINumberProperty,
	IPropsWithGUIOptions,
	IWithGUI,
	WithGUI
} from "../../Components"
import { SceneNode } from "../SceneNode"


export interface IPlatformGUIProperties extends GUIProperties {
	readonly visible: IGUIBooleanProperty
	readonly width: IGUINumberProperty
	readonly height: IGUINumberProperty
	readonly length: IGUINumberProperty
	readonly color: IGUIColorProperty
	readonly opacity: IGUINumberProperty
}

export interface IPlatformProps extends IPropsWithGUIOptions<IPlatformGUIProperties> {
	readonly visible?: boolean
	readonly width?: number
	readonly height?: number
	readonly length?: number
	readonly color?: number
	readonly transparent?: boolean
	readonly opacity?: number
	readonly texture?: string
}

export class Platform extends SceneNode<Mesh> {
	private readonly _initialWidth: number
	private readonly _initialHeight: number
	private readonly _initialLength: number
	private _color: number
	protected readonly _gui: IWithGUI

	constructor(props: IPlatformProps) {
		const initialWidth = props.width ?? 0.05
		const initialHeight = props.height ?? 0.05
		const initialLength = props.length ?? 0.05
		const color = props.color ?? 0x000000
		const texture = props.texture ? new TextureLoader().load(props.texture) : null;
		if (texture) {
			texture.wrapS = RepeatWrapping;
			texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(1, 2);
		}
		super(new Mesh(
			new BoxGeometry(initialWidth, initialHeight, initialLength),
			new MeshStandardMaterial({	// TODO: Si Pb de perf, passer à un type de Material plus light pour le GPU
				color,
				// side: DoubleSide,	// -> Eviter le DoubleSide si pas utile
				visible: props.visible ?? true,
				transparent: props.transparent ?? false,
				opacity: props.opacity ?? 1,
				map: texture,
			})
		))

		this._initialWidth = initialWidth || 1
		this._initialHeight = initialHeight || 1
		this._initialLength = initialLength || 1
		this._color = color
		this._gui = WithGUI.createAndApply(this, props, {
			visible: { type: "boolean" },
			width: { type: "number", min: 0, max: 5, step: .05 },
			height: { type: "number", min: .05, max: 1, step: .05 },
			length: { type: "number", min: 10, max: 200, step: .1 },
			color: { type: "color" },
			opacity: { type: "number", min: 0, max: 1, step: .01 },
		})
	}

	get visible() { return this._obj3D.visible }
	set visible(v: boolean) { this._obj3D.visible = v }
	get width() { return this._obj3D.scale.x * this._initialWidth }
	set width(x: number) { this._obj3D.scale.x = x / this._initialWidth }
	get height() { return this._obj3D.scale.y * this._initialHeight }
	set height(y: number) { this._obj3D.scale.y = y / this._initialHeight }
	get length() { return this._obj3D.scale.z * this._initialLength }
	set length(y: number) { this._obj3D.scale.z = y / this._initialLength }
	get color() { return this._color }
	set color(c: number) {
		this._color = Math.max(0, c);
		(this._obj3D.material as MeshBasicMaterial).color.set(new Color(this._color))
	}
	get opacity() { return (this._obj3D.material as MeshBasicMaterial).opacity }
	set opacity(v: number) {
		(this._obj3D.material as MeshBasicMaterial).opacity = v
	}
}