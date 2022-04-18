import type { GUIContainer } from "../../Components"
import { Platform } from "../../Templates"


export default class Platform1 extends Platform {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "Platform1",
			transparent: true,
			opacity: .8,
			width: 10,
			height: 50,
			color: 0x7f7f7f,
			gui: { container: parentGUIContainer }
		})
		this._obj3D.rotation.x = -Math.PI *.5
		this._obj3D.position.y = .1
	}
}