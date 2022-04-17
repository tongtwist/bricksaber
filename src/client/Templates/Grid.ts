import {
	GridHelper,
	ColorRepresentation
} from "three"
import {
	GUIProperties,
	IGUIBooleanProperty,
	IPropsWithGUIOptions,
	IWithGUI,
	WithGUI
} from "../Components"
import { SceneNode } from "./SceneNode"


export interface IGridGUIProperties extends GUIProperties {
	readonly visible: IGUIBooleanProperty
}

export interface IGridProps extends IPropsWithGUIOptions<IGridGUIProperties> {
	readonly size?: number
	readonly divisions?: number
	readonly color1?: ColorRepresentation
	readonly color2?: ColorRepresentation
	readonly visible?: boolean
}

export class Grid extends SceneNode<GridHelper> {
	private static _defaultGUIProps: IGridGUIProperties = {
		visible: { type: "boolean" }
	}

	private readonly _gui: IWithGUI

	constructor (props: IGridProps) {
		super(
			new GridHelper(
				props.size ?? 10,
				props.divisions ?? 10,
				props.color1 ?? 0x444444,
				props.color2 ?? 0x888888
			)
		)
		this._obj3D.visible = props.visible ?? true
		this._gui = WithGUI.createAndApply(this, props, Grid._defaultGUIProps)
	}

	get visible () { return this._obj3D.visible }
	set visible (v: boolean) { this._obj3D.visible = v}
}