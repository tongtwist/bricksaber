import type { GUIContainer } from "../../../Components"
import { Platform } from "../../../Templates"
import { LeftBorder } from "../Platform/Borders";
import { RightBorder } from "../Platform/Borders";
export default class Trail extends Platform {
	readonly leftBorderTrail: LeftBorder
	readonly rightBorderTrail: RightBorder

	constructor(parentGUIContainer: GUIContainer) {
		super({
			name: "Piste",
			width: 4,
			height: 100,
			length: 0.25,
			color: 0x000000,
			gui: { container: parentGUIContainer },
			reflectivity: .5,
			transmission: .5,
			roughness: .5,
			metalness: .5,
			clearcoat: .5,
			clearcoatRoughness: .5,
			ior: .5,
		});
		this._obj3D.rotation.x = -Math.PI * .5;

		this.leftBorderTrail = new LeftBorder(this._gui.container);
		this.rightBorderTrail = new RightBorder(this._gui.container);
		this.add(this.leftBorderTrail);
		this.add(this.rightBorderTrail);
	}
}