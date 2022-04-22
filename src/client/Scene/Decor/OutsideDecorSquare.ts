import type { GUIContainer } from "../../Components";
import { Cylinder } from "../../Templates/Cylinder";

export default class OutsideDecorSquare extends Cylinder {
  constructor(parentGUIContainer: GUIContainer) {
    super({
      name: "Outside Decor Square",
      transparent: true,
      opacity: 1,
      radiusTop: 4,
      radiusBottom: 4,
      height: 0.2,
      radialSegments: 4,
      heightSegments: 4,
      openEnded: true,
      color: 0x0000ff,
      gui: { container: parentGUIContainer },
    });
    this._obj3D.rotation.x = -Math.PI * 0.5;
    this._obj3D.position.y = 0.1;
  }
}
