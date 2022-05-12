import { GUIContainer } from "../../../Components";
import { Platform } from "../../../Templates/Decor";

export class Ground extends Platform {
    constructor(parentGUIContainer: GUIContainer) {
        super({
            name: "PlatformGround",
            width: 10,
            height: 15,
            length: 0.25,
            color: 0x7f7f7f,
            texture: "/assets/textures/ground.jpg",
            gui: { container: parentGUIContainer }
        })
        this._obj3D.rotation.x = -Math.PI * .5
        this._obj3D.position.z = 5
    }
}