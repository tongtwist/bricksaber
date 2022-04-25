import type { GUIContainer } from "../../Components"
import { Group } from "../../Templates"
import Body from "./Body"
import Head from "./Head"
import LeftArm from "./LeftArm"
import RightArm from "./RightArm"
import Saber from "./Saber"


export default class Player extends Group {
  private readonly _body: Body
  private readonly _head: Head
  private readonly _leftArm: LeftArm
  private readonly _rightArm: RightArm
  private readonly _leftSaber: Saber
  private readonly _rightSaber: Saber

  public constructor(parentGUIContainer: GUIContainer) {
    super({
      name: "Player",
      gui: { container: parentGUIContainer }
    })

    this._body = new Body({
      name: "Body",
      gui: { container: this._gui.container }
    })
    this._head = new Head({
      name: "Head",
      gui: { container: this._gui.container }
    })
    this._leftArm = new LeftArm({
      name: "Left Arm",
      gui: { container: this._gui.container }
    })
    this._rightArm = new RightArm({
      name: "Right Arm",
      gui: { container: this._gui.container }
    })
    this._leftSaber = new Saber({
      name: "Left Saber",
      gui: { container: this._gui.container }
    })
    this._leftSaber.obj3D.position.x = -1.2
    this._leftSaber.obj3D.rotation.x = -2 * Math.PI / 6
    this._rightSaber = new Saber({
      name: "Right Saber",
      gui: { container: this._gui.container }
    })
    this._rightSaber.obj3D.position.x = 1.2
    this._rightSaber.obj3D.rotation.x = -2 * Math.PI / 6
    this.add(
      this._body,
      this._head,
      this._leftArm,
      this._rightArm,
      this._leftSaber,
      this._rightSaber
    )
  }

  get body () { return this._body }
  get head () { return this._head }
  get leftArm () { return this._leftArm }
  get rightArm () { return this._rightArm }
  get leftSaber () { return this._leftSaber }
  get rightSaber () { return this._rightSaber }
}
