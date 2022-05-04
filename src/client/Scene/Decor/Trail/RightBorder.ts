import type { GUIContainer } from "../../../Components"
import { Border } from "../../../Templates"


export default class LeftBorder extends Border {
	constructor (parentGUIContainer: GUIContainer) {
		const length = 40
		super({
			name: "RightBorder",
			length,
			x: 2,
			z: -(length / 2) - 10 - 1,
			gui: { container: parentGUIContainer }
		})
	}
}