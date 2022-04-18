import { Group as ThreeGroup } from "three"

import {
	GUIProperties,
	IGUIBooleanProperty,
	IPropsWithGUIOptions,
	IWithGUI,
	WithGUI
} from "../Components"
import { SceneNode } from "./SceneNode"


export interface IGroupGUIProperties extends GUIProperties {
	readonly visible: IGUIBooleanProperty
}

export interface IGroupProps extends IPropsWithGUIOptions<{}> {
	readonly visible?: boolean
}

export class Group extends SceneNode<ThreeGroup> {
	protected readonly _gui: IWithGUI

	constructor(props: IGroupProps) {
		super(new ThreeGroup())
		this._obj3D.visible = props.visible ?? true
		this._gui = WithGUI.createAndApply(this, props)
	}

	get visible () { return this._obj3D.visible }
	set visible (v: boolean) { this._obj3D.visible = v }

	renderingComputation(dt: number) {
		this.childrenRenderingComputations(dt)
	}
}