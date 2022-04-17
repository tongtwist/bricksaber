import type { GUIContainer } from "../Components"
import { Grid } from "../Templates"


export default class SunGrid extends Grid {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "Grid",
			size: 4,
			visible: true,
			gui: { container: parentGUIContainer }
		})
	}
}