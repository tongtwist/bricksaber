import type { GUIContainer } from "../../Components"
import { Light } from "../../Templates/Light"


export default class AmbientLight extends Light {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "AmbientLight",
			color: 0xffffff,
            intensity: 0.5,
            gui: { container: parentGUIContainer }
		})
	}
}