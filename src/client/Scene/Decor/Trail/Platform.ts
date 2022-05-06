import type { GUIContainer } from "../../../Components";
import { Border } from "../../../Templates";

export default class RightBorderColumn extends Border {
  constructor(parentGUIContainer: GUIContainer) {
    const length = 40;
    const height = 1;
    super({
      name: "Platform",
      length,
      width: 4.5,
      height,
      color: 0x181818,
      y: -(height - height / 2 + 0.2),
      z: -(length / 2) - 10 - 1,
      bloom: 0,
      gui: { container: parentGUIContainer },
    });
  }
}
