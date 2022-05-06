import type { GUIContainer } from "../../../Components"
import { Border } from "../../../Templates/Decor"


export default class PlayerPlatformTopBorder extends Border {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatformTopBorder",
			width: 10,
			z: -2.5,
			gui: { container: parentGUIContainer },
		})
	}
}