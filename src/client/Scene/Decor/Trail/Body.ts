import type { GUIContainer } from "../../../Components"
import { Platform } from "../../../Templates"


export default class Trail extends Platform {
	constructor(parentGUIContainer: GUIContainer) {
		super({
			name: "Body",
			width: 4,
			length: 200,
			reflectivity: .5,
			transmission: .5,
			roughness: .5,
			metalness: .5,
			clearcoat: .5,
			clearcoatRoughness: .5,
			ior: .5,
			gui: { container: parentGUIContainer }
		})
	}
}