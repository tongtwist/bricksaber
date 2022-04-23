import type { GUIContainer } from "../../../Components"
import { Group } from "../../../Templates"

import Body from "./Body"
import LeftBorder from "./LeftBorder"
import RightBorder from "./RightBorder"


export default class Trail extends Group {
	private readonly _body: Body
	private readonly _leftBorderTrail: LeftBorder
	private readonly _rightBorderTrail: RightBorder

	constructor(parentGUIContainer: GUIContainer) {
		super({ name: "Piste", gui: { container: parentGUIContainer } })
		this._body = new Body(this._gui.container)
		this._leftBorderTrail = new LeftBorder(this._gui.container)
		this._rightBorderTrail = new RightBorder(this._gui.container)
		this._obj3D.position.z = -98
		this.add(this._body, this._leftBorderTrail, this._rightBorderTrail)
	}
}