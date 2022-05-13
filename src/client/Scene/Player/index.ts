import {
  Group as ThreeGroup,
  Mesh,
  MeshBasicMaterial,
  SphereBufferGeometry,
  Raycaster,
  Vector3
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
import type Scene from ".."


export interface IPlayerProps {
  readonly parentGUIContainer: GUIContainer
  readonly vr: VR
  readonly gltfLoader: GLTFLoader
  readonly scene: Scene
}

interface IPlayerChildren {
  body: Body
  head: Head
  leftSaber: LeftSaber
  rightSaber: RightSaber
}

export default class Player extends Group {
  private _scene: Scene
  private _vr: VR
  private _leftHand: ThreeGroup
  private _rightHand: ThreeGroup
  private _leftRay: Raycaster
  private _leftOrigin: Vector3
  private _leftDirection: Vector3
  private _leftIntersects: Array<any>
  private _rightRay: Raycaster
  private _rightOrigin: Vector3
  private _rightDirection: Vector3
  private _rightIntersects: Array<any>
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
    this._scene = props.scene
    this._vr = props.vr
    this._leftHand = props.vr.leftHand
    this._leftHand.visible = true
    this._leftOrigin = new Vector3()
    this._leftDirection = new Vector3()
    this._leftIntersects = Array(20)
    this._rightHand = props.vr.rightHand
    this._rightHand.visible = true
    this._rightOrigin = new Vector3()
    this._rightDirection = new Vector3()
    this._rightIntersects = Array(20)
    this._leftRay = new Raycaster(new Vector3(), new Vector3(), .1, 50)
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

  private _saberIntersections () {
    const objectsToTest = this._scene.track?.obj3D.children[1].children ?? []
    if (this._leftSaber) {
      const saberChildren = this._leftSaber.obj3D.children
      const lame = saberChildren[0].name === "Lame"
        ? saberChildren[0]
        : saberChildren[1]
      const pointe = lame.children[0].name === "Pointe"
        ? lame.children[0]
        : lame.children[1]
      this._leftDirection.setFromMatrixPosition(pointe.matrixWorld)
      this._leftOrigin = this._leftHand.position
      this._scene.red1.position.set(this._leftOrigin.x, this._leftOrigin.y, this._leftOrigin.z)
      this._scene.red2.position.set(this._leftDirection.x, this._leftDirection.y, this._leftDirection.z)
      this._leftRay.set(this._leftOrigin, this._leftDirection)
      //console.log(objectsToTest)
      /*const intersects = */this._leftRay.intersectObjects(objectsToTest, false, this._leftIntersects)
      //if (this._leftIntersects.length > 0) {
        //console.log("Red", Date.now(), this._leftIntersects)
      //}
      //console.log(leftDirection)
      //console.log(leftOrigin, this._leftSaber)
    }
    if (this._rightSaber) {
      const saberChildren = this._rightSaber.obj3D.children
      const lame = saberChildren[0].name === "Lame"
        ? saberChildren[0]
        : saberChildren[1]
      const pointe = lame.children[0].name === "Pointe"
        ? lame.children[0]
        : lame.children[1]
      this._rightDirection.setFromMatrixPosition(pointe.matrixWorld)
      this._rightOrigin = this._rightHand.position
      this._scene.blue1.position.set(this._rightOrigin.x, this._rightOrigin.y, this._rightOrigin.z)
      this._scene.blue2.position.set(this._rightDirection.x, this._rightDirection.y, this._rightDirection.z)
      this._rightRay.set(this._rightOrigin, this._rightDirection)
      /*const intersects = */this._rightRay.intersectObjects(objectsToTest, false, this._rightIntersects)
      //if (intersects.length > 0) {
        console.log("Blue", Date.now(), this._rightIntersects)
      //}
    }
    //const rightOrigin: Vector3 = this._rightHand.position.clone()
  }

  renderingComputation(t: number, dt: number, audioTime: number): void {
    this._saberIntersections()
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
