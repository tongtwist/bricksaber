import type { GUIContainer } from "../../Components"
import { Platform } from "../../Templates"


export default class Platform1 extends Platform {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "Platform1",
			transparent: true,
			opacity: .8,
			width: 2,
			height: 2,
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
		this._obj3D.rotation.x = -Math.PI *.5
		this._obj3D.position.y = .1
	}
}