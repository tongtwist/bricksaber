import {
  Group as ThreeGroup,
  Mesh,
  MeshBasicMaterial,
  SphereBufferGeometry,
  Raycaster
} from "three"
import type { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import type {
  GUIContainer,
  VR
} from "../../Components"
import { Group } from "../../Templates"
import Body from "./Body"
import Head from "./Head"
import LeftSaber from "./LeftSaber"
import RightSaber from "./RightSaber"


export interface IPlayerProps {
  readonly parentGUIContainer: GUIContainer
  readonly vr: VR
  readonly gltfLoader: GLTFLoader
}

interface IPlayerChildren {
  body: Body
  head: Head
  leftSaber: LeftSaber
  rightSaber: RightSaber
}

export default class Player extends Group {
  private _vr: VR
  private _leftHand: ThreeGroup
  private _rightHand: ThreeGroup
  private _leftRay: Raycaster
  private _rightRay: Raycaster
  private _lastLeftPos: string
  private _lastHeadPos: string
  private _body?: Body
  private _head?: Head
  private _leftSaber?: LeftSaber
  private _rightSaber?: RightSaber

  private constructor(
    props: IPlayerProps
  ) {
    super({
      name: "Player",
      gui: { container: props.parentGUIContainer }
    })
    this._vr = props.vr
    this._leftHand = props.vr.leftHand
    this._leftHand.visible = true
    this._rightHand = props.vr.rightHand
    this._rightHand.visible = true
    this._leftRay = new Raycaster()
    this._rightRay = new Raycaster()
    
    this._lastLeftPos = ""
    this._lastHeadPos = ""
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
      this._leftHand.add(this._leftSaber.obj3D)
      this._rightHand.add(this._rightSaber.obj3D)
      this.add(this._body, this._head)
      this._obj3D.add(
        this._leftHand,
        this._rightHand,
      )
    }
  }

  enterVR () {
    if (this._leftSaber) {
      this._leftSaber!.enterVR()
    }
    if (this._rightSaber) {
      this._rightSaber!.enterVR()
    }
    if (this._body) {
      this._body.visible = false
    }
    if (this._head) {
      this._head.visible = false
    }
  }

  leaveVR () {
    if (this._leftSaber) {
      this._leftSaber!.leaveVR()
    }
    if (this._rightSaber) {
      this._rightSaber!.leaveVR()
    }
    if (this._body) {
      this._body.visible = true
    }
    if (this._head) {
      this._head.visible = true
    }
  }

  static async create (
    props: IPlayerProps
  ): Promise<Player> {
    const result = new Player(props)
    const [ body, head, leftSaber, rightSaber ] = await Promise.all([
      Body.create({
        name: "Body",
        gui: { container: result._gui.container }
      }, props.gltfLoader),
      Head.create({
        name: "Head",
        gui: { container: result._gui.container }
      }, props.gltfLoader),
      LeftSaber.create({
        name: "Left Saber",
        gui: { container: result._gui.container }
      }, props.gltfLoader),
      RightSaber.create({
        name: "Right Saber",
        gui: { container: result._gui.container }
      }, props.gltfLoader)
    ])
    result._setChildren({ body, head, leftSaber, rightSaber })
    result._leftSaber!.obj3D.position.x = -0.5
    result._leftSaber!.obj3D.rotation.x = -2 * Math.PI / 6
    result._rightSaber!.obj3D.position.x = 0.5
    result._rightSaber!.obj3D.rotation.x = -2 * Math.PI / 6
    const sphereGeo = new SphereBufferGeometry(.2)
    const sphereMaterial = new MeshBasicMaterial({
      color: 0xffff00
    })
    const leftTargetMesh = new Mesh(sphereGeo, sphereMaterial)
    const rightTargetMesh = new Mesh(sphereGeo, sphereMaterial)

    return result
  }
}
