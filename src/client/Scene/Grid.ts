import type { GUIContainer } from "../Components"
import { Grid } from "../Templates"


export default class SunGrid extends Grid {
	private constructor (
		parentGUIContainer: GUIContainer
	) {
		super({
			name: "Grid",
			size: 4,
			visible: false,
			gui: { container: parentGUIContainer }
		})
	}

	static async create (
		parentContainer: GUIContainer
	): Promise<SunGrid> {
		return new SunGrid(parentContainer)
	}
}