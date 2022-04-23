import { Axes } from "../Templates"
import type { GUIContainer } from "../Components"


export default class SunAxes extends Axes {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "Axes",
			size: 3,
			visible: false,
			gui: { container: parentGUIContainer }
		})
	}
}