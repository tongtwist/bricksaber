import type { GUIContainer } from "../../../Components"
import { Border } from "../../../Templates"


export default class PlayerPlatformBottomBorder extends Border {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatformBottomBorder",
			width: 2.05,
			z: 1,
			gui: { container: parentGUIContainer },
		})
	}
}