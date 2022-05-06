import type { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import type { GUIContainer } from "../../Components"
import { Group } from "../../Templates"
import Body from "./Body"
import Head from "./Head"
import LeftSaber from "./LeftSaber"
import RightSaber from "./RightSaber"


interface IPlayerChildren {
  body: Body
  head: Head
  leftSaber: LeftSaber
  rightSaber: RightSaber
}

export default class Player extends Group {
  private _body?: Body
  private _head?: Head
  private _leftSaber?: LeftSaber
  private _rightSaber?: RightSaber

  private constructor(
    parentGUIContainer: GUIContainer
  ) {
    super({
      name: "Player",
      gui: { container: parentGUIContainer }
    })
  }

  get body () { return this._body }
  get head () { return this._head }
  get leftSaber () { return this._leftSaber }
  get rightSaber () { return this._rightSaber }

  private _setChildren(children: IPlayerChildren) {
    if (typeof this._body === "undefined") {
      this._body = children.body
      this._head = children.head
      this._leftSaber = children.leftSaber
      this._rightSaber = children.rightSaber
      this.add(
        this._body,
        this._head,
        this._leftSaber,
        this._rightSaber
      )
    }
  }

  static async create (
    parentContainer: GUIContainer,
    gltfLoader: GLTFLoader
  ): Promise<Player> {
    const result = new Player(parentContainer)
    const [ body, head, leftSaber, rightSaber ] = await Promise.all([
      Body.create({
        name: "Body",
        gui: { container: result._gui.container }
      }),
      Head.create({
        name: "Head",
        gui: { container: result._gui.container }
      }, gltfLoader),
      LeftSaber.create({
        name: "Left Saber",
        gui: { container: result._gui.container }
      }, gltfLoader),
      RightSaber.create({
        name: "Right Saber",
        gui: { container: result._gui.container }
      }, gltfLoader)
    ])
    head.obj3D.rotation.y = -2.5
    head.obj3D.scale.x = 0.5
    head.obj3D.scale.y = 0.5
    head.obj3D.scale.z = 0.5

    console.log("head",head)
    result._setChildren({ body, head, leftSaber, rightSaber })
    result._leftSaber!.obj3D.position.x = -1.2
    result._leftSaber!.obj3D.rotation.x = -2 * Math.PI / 6
    result._rightSaber!.obj3D.position.x = 1.2
    result._rightSaber!.obj3D.rotation.x = -2 * Math.PI / 6
    return result
  }
}
