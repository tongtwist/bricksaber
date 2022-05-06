import type { GUIContainer } from "../../../Components"
import { Border } from "../../../Templates/Decor"


export default class LeftBorder extends Border {
	constructor (parentGUIContainer: GUIContainer) {
		const length = 55
		super({
			name: "LeftBorder",
			length,
			x: -2,
			z: -(length / 2) - 3.5,
			gui: { container: parentGUIContainer }
		})
	}
}