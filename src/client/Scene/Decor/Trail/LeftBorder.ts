import type { GUIContainer } from "../../../Components";
import { Border } from "../../../Templates/Decor";

export default class LeftBorder extends Border {
  constructor(parentGUIContainer: GUIContainer) {
    const length = 40;
    super({
      name: "LeftBorder",
      length,
      color: 0xa4f4fa,
      x: -2,
      z: -(length / 2) - 10 - 1,
      gui: { container: parentGUIContainer },
    });
  }
}
