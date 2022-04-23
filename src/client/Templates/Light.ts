import {
	AmbientLight,
	Light as ThreeLight,
	Color
} from "three"

import {
	GUIProperties,
	IGUIColorProperty,
	IGUINumberProperty,
	IPropsWithGUIOptions,
	IWithGUI,
	WithGUI
} from "../Components"
import { SceneNode } from "./SceneNode"


export interface ILightGUIProperties extends GUIProperties {
	readonly color: IGUIColorProperty
	readonly intensity: IGUINumberProperty

}

export interface ILightProps extends IPropsWithGUIOptions<ILightGUIProperties> {
	readonly color: number
	readonly intensity: number
}

export class Light extends SceneNode<ThreeLight> {

	private _color: number
	protected readonly _gui: IWithGUI

	constructor(props: ILightProps) {
		super(
            new AmbientLight(
				props.color,
				props.intensity
			)
        )
		this._color = props.color


	    this._gui = WithGUI.createAndApply(this, props, {
			color: { type: "color" },
			intensity: { type: "number" }
		})
	}

	get color () { return this._color }
	set color (c: number) {
		this._color = c
		this._obj3D.color = new Color(c);
	}
	
	get intensity () { return this._obj3D.intensity }
	set intensity (i: number) {
		this._obj3D.intensity = i
	}


	
}