import { AxesHelper } from "three"

import {
	GUIProperties,
	IGUIBooleanProperty,
	IPropsWithGUIOptions,
	IWithGUI,
	WithGUI
} from "../Components"
import { SceneNode } from "./SceneNode"


export interface IAxesGUIProperties extends GUIProperties {
	readonly visible: IGUIBooleanProperty
}

export interface IAxesProps extends IPropsWithGUIOptions<IAxesGUIProperties> {
	readonly size?: number
	readonly visible?: boolean
}

export class Axes extends SceneNode<AxesHelper> {
	private static _defaultGUIProps: IAxesGUIProperties = {
		visible: { type: "boolean" }
	}

	protected readonly _gui: IWithGUI

	constructor(props: IAxesProps) {
		super(new AxesHelper(props.size ?? 1))
		this.visible = props.visible ?? true
		this._gui = WithGUI.createAndApply(this, props, Axes._defaultGUIProps)
	}

	get visible () { return this._obj3D.visible }
	set visible (v: boolean) { this._obj3D.visible = v }
}