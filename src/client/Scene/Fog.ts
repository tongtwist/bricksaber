import {
	ColorRepresentation,
	Fog as ThreeFog
} from "three"
import {
	GUIProperties,
	IGUIColorProperty,
	IGUINumberProperty,
	IPropsWithGUIOptions,
	IWithGUI,
	WithGUI
} from "../Components"


export interface IFogGUIProperties extends GUIProperties {
	readonly color: IGUIColorProperty
	readonly near: IGUINumberProperty
	readonly far: IGUINumberProperty
}

export interface IFogProperties extends IPropsWithGUIOptions<IFogGUIProperties> {
	readonly color?: ColorRepresentation
	readonly near?: number
	readonly far?: number
}

export default class Fog extends ThreeFog {
	private readonly _gui: IWithGUI

	constructor (
		props: IFogProperties
	) {
		const colorInit = props.color ?? 0
		const nearInit = props.near ?? 25
		const farInit = props.far ?? 60
		super(colorInit, nearInit, farInit)
		this._gui = WithGUI.createAndApply(this, props, {
			color: { type: "color" },
			near: { type: "number", min: 0, max: 200, step: 1 },
			far: { type: "number", min: 1, max: 200, step: 1 }
		})
	}
}