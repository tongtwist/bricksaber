import type { GUIContainer } from "../../../Components"
import { Border } from "../../../Templates"


export default class PlayerPlatformRightBorder extends Border {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatformRightBorder",
			length: 2,
			x: 1,
			gui: { container: parentGUIContainer },
		})
	}
}