import type { GUIContainer } from "../../../Components"
import { BoxBloomed } from "../../../Templates/BoxBloomed"


export default class PlayerPlatformRightBorder extends BoxBloomed {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatformRightBorder",
			width: 0.15,
			height: 2,
			length: 0.25,
			color: 0xffffff,
			x: 1 + 0.15/2,
			gui: { container: parentGUIContainer },
		})
	}
}