import type { GUIContainer } from "../../../Components"
import { Border } from "../../../Templates"


export default class LeftBorder extends Border {
	constructor (parentGUIContainer: GUIContainer) {
		const length = 50
		super({
			name: "LeftBorder",
			length,
			x: -2,
			z: -(length / 2) - 10,
			gui: { container: parentGUIContainer }
		})
	}
}