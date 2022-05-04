import type { GUIContainer } from "../../../Components"
import { Border } from "../../../Templates"


export default class PlayerPlatformLeftBorder extends Border {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatformLeftBorder",
			length: 2,
			x: -1,
			gui: { container: parentGUIContainer },
		})
	}
}