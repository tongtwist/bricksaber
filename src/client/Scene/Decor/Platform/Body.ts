import type { GUIContainer } from "../../../Components"
import { Platform } from "../../../Templates"


export default class PlayerPlatform extends Platform {
	constructor(parentGUIContainer: GUIContainer) {
		super({
			name: "Body",
			width: 2,
			height: 2,
			length: 0.25,
			color: 0x7f7f7f,
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