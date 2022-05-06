import type { GUIContainer } from "../../../Components";
import { Border } from "../../../Templates";

export default class RightBorderColumn extends Border {
  constructor(parentGUIContainer: GUIContainer) {
    const length = 1;
    const height = 30;
    super({
      name: "RightBorderColumn",
      length,
      width: 0.5,
      height,
      color: 0x181818,
      x: 2,
      y: -(height - height / 2 + 0.2),
      z: -(length / 2) - 10 - 1,
      bloom: 0,
      gui: { container: parentGUIContainer },
    });
  }
}
