import { EdgesGeometry, LineBasicMaterial, LineSegments } from "three"
import type { GUIContainer } from "../../Components"
import { Platform } from "../../Templates"


export default class PlayerPlatform extends Platform {
	constructor(parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatform",
			transparent: true,
			opacity: 0.5,
			width: 2,
			height: 2,
			length: 0.25,
			color: 0x7f7f7f,
			gui: { container: parentGUIContainer }
		})
		this._obj3D.rotation.x = -Math.PI * .5
		this._obj3D.position.y = 0
		const edges = new EdgesGeometry(this._obj3D.geometry)
		const line = new LineSegments(edges, new LineBasicMaterial({ color: 0xffffff }));
		this._obj3D.add(line)
	}
}