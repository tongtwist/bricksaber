import type { GUIContainer } from "../../../Components"
import { Border } from "../../../Templates/Decor"


export default class PlayerPlatformLeftBorder extends Border {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatformLeftBorder",
			length: 15,
			x: -5,
			z: 5,
			gui: { container: parentGUIContainer },
		})
	}
}