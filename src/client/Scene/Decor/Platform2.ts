import type { GUIContainer } from "../../Components"
import { Platform } from "../../Templates"


export default class Platform2 extends Platform {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "Platform2",
			width: 4,
			height: 100,
			length: 0,
			color: 0xff00ff,
			gui: { container: parentGUIContainer }
		})
		this._obj3D.rotation.x = -Math.PI *.5
	}
}