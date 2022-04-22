import { EdgesGeometry, LineBasicMaterial, LineSegments } from "three"
import type { GUIContainer } from "../../Components"
import { Platform } from "../../Templates"


export default class PlayerPlatform extends Platform {
	constructor(parentGUIContainer: GUIContainer) {
		super({
			name: "Platform1",
			width: 2,
			height: 2,
			length: 0.25,
			color: 0x7f7f7f,
			gui: { container: parentGUIContainer },
			reflectivity: .5,
			transmission: .5,
			roughness: .5,
			metalness: .5,
			clearcoat: .5,
			clearcoatRoughness: .5,
			ior: .5
		})
		this._obj3D.rotation.x = -Math.PI * .5
		this._obj3D.position.y = 0
	}
}