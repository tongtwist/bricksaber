import type { GUIContainer } from "../../../Components"
import { BoxBloomed } from "../../../Templates/BoxBloomed"


export default class PlayerPlatformTopBorder extends BoxBloomed {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatformTopBorder",
			width: 0.15,
			height: 2.3,
			length: 0.25,
			color: 0xffffff,
			y: -(1 + 0.15/2),
			zRotation: Math.PI * .5,
			gui: { container: parentGUIContainer },
		})
	}
}