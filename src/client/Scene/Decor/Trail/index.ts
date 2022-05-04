import type { GUIContainer } from "../../../Components"
import { Group } from "../../../Templates"

import LeftBorder from "./LeftBorder"
import RightBorder from "./RightBorder"


export default class Trail extends Group {
	private readonly _leftBorderTrail: LeftBorder
	private readonly _rightBorderTrail: RightBorder

	constructor(parentGUIContainer: GUIContainer) {
		super({ name: "Piste", gui: { container: parentGUIContainer } })
		this._leftBorderTrail = new LeftBorder(this._gui.container)
		this._rightBorderTrail = new RightBorder(this._gui.container)
		this.add(
			this._leftBorderTrail,
			this._rightBorderTrail
		)
	}
}