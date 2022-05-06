import type { GUIContainer } from "../../../Components"
import { Group } from "../../../Templates"
import { Ground } from "./Ground"

import LeftBorder from "./LeftBorder"
import RightBorder from "./RightBorder"


export default class Trail extends Group {
	private readonly _leftBorderTrail: LeftBorder
	private readonly _rightBorderTrail: RightBorder
	private readonly _ground: Ground

	constructor(parentGUIContainer: GUIContainer) {
		super({ name: "Piste", gui: { container: parentGUIContainer } })
		this._leftBorderTrail = new LeftBorder(this._gui.container)
		this._rightBorderTrail = new RightBorder(this._gui.container)
		this._ground = new Ground(this._gui.container)
		this.add(
			this._leftBorderTrail,
			this._rightBorderTrail,
			this._ground
		)
	}
}