import type { GUIContainer } from "../../Components";
import { Cylinder } from "../../Templates/Cylinder";

export default class OutsideDecorSquare extends Cylinder {
  constructor(parentGUIContainer: GUIContainer,name:string,number:number) {
    super({
      name: "Outside Decor Square "+name,
      transparent: true,
      opacity: 1,
      radiusTop: 8,
      radiusBottom: 8,
      height: 0.5,
      radialSegments: 4,
      heightSegments: 4,
      openEnded: true,
      color: 0x0000ff,
      gui: { container: parentGUIContainer },
    });
    this._obj3D.rotation.x = -Math.PI * 0.5;
    this._obj3D.position.z = number * 10;
    this._obj3D.rotation.y= number;
  }
}
