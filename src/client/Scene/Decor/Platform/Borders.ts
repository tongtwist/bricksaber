import { BoxBloomed } from "../../../Templates/BoxBloomed";
import type { GUIContainer } from "../../../Components";


export class LeftBorder extends BoxBloomed {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "LeftBorder",
			width: 0.15,
			height: 100,
			length: 0.25,
			color: 0xffffff,
			gui: { container: parentGUIContainer },
		});
		this._obj3D.position.x = -2.15;
	}
}

export class RightBorder extends BoxBloomed {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "RightBorder",
			width: 0.15,
			height: 100,
			length: 0.25,
			color: 0xffffff,
			gui: { container: parentGUIContainer },
		});
		this._obj3D.position.x = 2.15;
	}
}