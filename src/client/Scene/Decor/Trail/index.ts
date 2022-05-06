import type { GUIContainer } from "../../../Components"
import { Group } from "../../../Templates"

import LeftBorder from "./LeftBorder";
import RightBorder from "./RightBorder";
import LeftBorderColumn from "./LeftBorderColumn";
import RightBorderColumn from "./RightBorderColumn";
import Platfrom from "./Platform";
import LeftSupportPlatform from "./LeftSupportPlatform";
import RightSupportPlatform from "./RightSupportPlatform";


export default class Trail extends Group {
  private readonly _leftBorderTrail: LeftBorder;
  private readonly _rightBorderTrail: RightBorder;
  private readonly _leftBorderColumnTrail: LeftBorderColumn;
  private readonly _rightBorderColumnTrail: RightBorderColumn;
  private readonly _platformTrail: Platfrom;
  private readonly _leftSupportPlatform: LeftSupportPlatform;
  private readonly _rightSupportPlatform: RightSupportPlatform;

  constructor(parentGUIContainer: GUIContainer) {
    super({ name: "Piste", gui: { container: parentGUIContainer } });
    this._leftBorderTrail = new LeftBorder(this._gui.container);
    this._rightBorderTrail = new RightBorder(this._gui.container);
    this._leftBorderColumnTrail = new LeftBorderColumn(this._gui.container);
    this._rightBorderColumnTrail = new RightBorderColumn(this._gui.container);
    this._platformTrail = new Platfrom(this._gui.container);
    this._leftSupportPlatform = new LeftSupportPlatform(this._gui.container);
    this._rightSupportPlatform = new RightSupportPlatform(this._gui.container);
    this.add(
      this._leftBorderTrail,
      this._rightBorderTrail,
      this._leftBorderColumnTrail,
      this._rightBorderColumnTrail,
      this._platformTrail,
      this._leftSupportPlatform,
      this._rightSupportPlatform,
    );
  }
}
