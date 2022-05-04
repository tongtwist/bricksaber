import type { GUIContainer } from "../../../Components"
import { Group } from "../../../Templates"
import LeftBorder from "./LeftBorder"
import RightBorder from "./RightBorder"
import TopBorder from "./TopBorder"
import BottomBorder from "./BottomBorder"


export class PlayerPlatform extends Group {
	private readonly _leftBorder: LeftBorder
	private readonly _rightBorder: RightBorder
	private readonly _topBorder: TopBorder
	private readonly _bottomBorder: BottomBorder

	constructor(parentGUIContainer: GUIContainer) {
		super({
			name: "Platform",
			gui: { container: parentGUIContainer }
		})
		this._leftBorder = new LeftBorder(this._gui.container)
		this._rightBorder = new RightBorder(this._gui.container)
		this._topBorder = new TopBorder(this._gui.container)
		this._bottomBorder = new BottomBorder(this._gui.container)
		this.add(
			this._leftBorder,
			this._rightBorder,
			this._topBorder,
			this._bottomBorder
		)
	}
	get leftBorder () { return this._leftBorder }
	get rightBorder () { return this._rightBorder }
	get topBorder () { return this._topBorder }
	get bottomBorder () { return this._bottomBorder }
}