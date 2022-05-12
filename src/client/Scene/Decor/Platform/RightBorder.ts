import type { GUIContainer } from "../../../Components"
import { Border } from "../../../Templates/Decor"


export default class PlayerPlatformRightBorder extends Border {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatformRightBorder",
			length: 15,
			x: 5,
			z: 5,
			gui: { container: parentGUIContainer },
		})
	}
}