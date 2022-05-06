import type { GUIContainer } from "../../../Components";
import { Border } from "../../../Templates/Decor";

export default class LeftSupportPlatform extends Border {
  constructor(parentGUIContainer: GUIContainer) {
    const length = 1;
    const height = 2;
    super({
      name: "LeftSupportPlatform",
      length: 0.2,
      width: 0.2,
      height,
      color: 0x181818,
      x: -1.2,
      y: -1.7,
      z: -(length / 2) - 10 - 1,
      bloom: 0,
      zRotation: -0.7,
      gui: { container: parentGUIContainer },
    });
  }
}
