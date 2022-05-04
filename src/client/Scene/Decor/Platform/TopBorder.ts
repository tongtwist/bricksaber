import type { GUIContainer } from "../../../Components"
import { Border } from "../../../Templates"


export default class PlayerPlatformTopBorder extends Border {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatformTopBorder",
			width: 2.05,
			z: -1,
			gui: { container: parentGUIContainer },
		})
	}
}