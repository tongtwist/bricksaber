import type { GUIContainer } from "../../../Components";
import { Group } from "../../../Templates";

import LeftBorder from "./LeftBorder";
import RightBorder from "./RightBorder";
import LeftBorderColumn from "./LeftBorderColumn";
import RightBorderColumn from "./RightBorderColumn";
import Platfrom from "./Platform";

export default class Trail extends Group {
  private readonly _leftBorderTrail: LeftBorder;
  private readonly _rightBorderTrail: RightBorder;
  private readonly _leftBorderColumnTrail: RightBorder;
  private readonly _rightBorderColumnTrail: RightBorder;
  private readonly _platformTrail: Platfrom;

  constructor(parentGUIContainer: GUIContainer) {
    super({ name: "Piste", gui: { container: parentGUIContainer } });
    this._leftBorderTrail = new LeftBorder(this._gui.container);
    this._rightBorderTrail = new RightBorder(this._gui.container);
    this._leftBorderColumnTrail = new LeftBorderColumn(this._gui.container);
    this._rightBorderColumnTrail = new RightBorderColumn(this._gui.container);
    this._platformTrail = new Platfrom(this._gui.container);
    this.add(
      this._leftBorderTrail,
      this._rightBorderTrail,
      this._leftBorderColumnTrail,
      this._rightBorderColumnTrail,
      this._platformTrail
    );
  }
}
