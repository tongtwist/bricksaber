import { GUIContainer } from "../../../Components";
import { Platform } from "../../../Templates/Decor";

export class Ground extends Platform {
    constructor(parentGUIContainer: GUIContainer) {
        super({
            name: "TrailGround",
            width: 4,
			height: 55,
			length: 0,
			color: 0x000000,
            opacity: 0.3,
            transparent: true,
            gui: { container: parentGUIContainer }
        })
        this._obj3D.rotation.x = -Math.PI * .5
        this._obj3D.position.z = -31
    }
}