import type { GUIContainer } from "../../../Components"
import { Border } from "../../../Templates"


export default class LeftBorder extends Border {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "LeftBorder",
			x: -2.15,
			gui: { container: parentGUIContainer }
		})
	}
}