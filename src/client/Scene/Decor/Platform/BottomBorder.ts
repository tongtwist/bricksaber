import type { GUIContainer } from "../../../Components"
import { Border } from "../../../Templates/Decor"


export default class PlayerPlatformBottomBorder extends Border {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatformBottomBorder",
			width: 10,
			z: 12.5,
			gui: { container: parentGUIContainer },
		})
	}
}