import {
  Group as ThreeGroup,
  Intersection,
  Object3D,
  Mesh,
  MeshBasicMaterial
} from "three"
import type { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import {
  GUIContainer,
  VR
} from "../../Components"
import {
  Group,
  Trail
} from "../../Templates"
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
  private _leftHand: ThreeGroup
  private _rightHand: ThreeGroup
  private _body?: Body
  private _head?: Head
  private _leftSaber?: LeftSaber
  private readonly _leftTrail: Trail
  private _rightSaber?: RightSaber
  private readonly _rightTrail: Trail

  private constructor(
    props: IPlayerProps
  ) {
    super({
      name: "Player",
      gui: { container: props.parentGUIContainer }
    })
    this._scene = props.scene
    this._leftHand = props.vr.leftHand
    this._leftHand.visible = true
    this._rightHand = props.vr.rightHand
    this._rightHand.visible = true
    const steps = 3
    const sensorsNum = 3
    this._leftTrail = new Trail({ name: "leftTrail", steps, color: 0xff0000, sensorsNum })
    this._rightTrail = new Trail({ name: "rightTrail", steps, color: 0x0000ff, sensorsNum })
    this._obj3D.add(
      this._leftTrail.group,
      this._rightTrail.group
    )
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
      this._obj3D.add(this._leftHand, this._rightHand)
    }
  }

  renderingComputation(t: number, dt: number, audioTime: number): void {
    if (this._leftSaber && this._leftSaber.pit) {
      this._leftSaber.computePitPosition()
      this._leftTrail.moveForward(
        this._leftSaber.handlePosition,
        this._leftSaber.pitPosition
      )
      const bladeCollisions: Array<Intersection<Object3D>>
        = this._leftSaber.collisions()
      const trailCollisions: Array<Array<Intersection<Object3D>>>
        = this._leftTrail.collisions()
      for (const i of bladeCollisions) {
        const o: Mesh = i.object as Mesh
        let m: MeshBasicMaterial = o.material as MeshBasicMaterial
        o.material = m.clone()
        m = o.material as MeshBasicMaterial
        m.color.set(0)
      }
      for (const a of trailCollisions) {
        for (const i of a) {
          const o: Mesh = i.object as Mesh
          let m: MeshBasicMaterial = o.material as MeshBasicMaterial
          if (m.color.getHex() !== 0) {
            o.material = m.clone()
            m = o.material as MeshBasicMaterial
            m.color.set(0)
          }
        }
      }
      this._leftSaber.saveHandPosition()
    }
    if (this._rightSaber && this._rightSaber.pit) {
      this._rightSaber.computePitPosition()
      this._rightTrail.moveForward(
        this._rightSaber.handlePosition,
        this._rightSaber.pitPosition
      )
      const bladeCollisions: Array<Intersection<Object3D>>
        = this._rightSaber.collisions()
      const trailCollisions: Array<Array<Intersection<Object3D>>>
        = this._rightTrail.collisions()
      for (const i of bladeCollisions) {
        const o: Mesh = i.object as Mesh
        let m: MeshBasicMaterial = o.material as MeshBasicMaterial
        o.material = m.clone()
        m = o.material as MeshBasicMaterial
        m.color.set(0)
      }
      for (const a of trailCollisions) {
        for (const i of a) {
          const o: Mesh = i.object as Mesh
          let m: MeshBasicMaterial = o.material as MeshBasicMaterial
          if (m.color.getHex() !== 0) {
            o.material = m.clone()
            m = o.material as MeshBasicMaterial
            m.color.set(0)
          }
        }
      }
      this._rightSaber.saveHandPosition()
    }
  }

  enterVR () {
    const objectsToIntersect: Array<Object3D>
      = this._scene.track?.obj3D.children[1].children ?? []
    if (this._leftSaber) {
      this._leftTrail.objectsToTest = objectsToIntersect
      this._leftSaber.setCollidables(objectsToIntersect, true)
      this._leftSaber.enterVR()
    }
    if (this._rightSaber) {
      this._leftTrail.objectsToTest = objectsToIntersect
      this._rightSaber.setCollidables(objectsToIntersect, true)
      this._rightSaber.enterVR()
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
        gui: { container: result._gui.container },
        hand: props.vr.leftHand
      }, props.gltfLoader),
      RightSaber.create({
        name: "Right Saber",
        gui: { container: result._gui.container },
        hand: props.vr.rightHand
      }, props.gltfLoader)
    ])
    result._setChildren({ body, head, leftSaber, rightSaber })
    result._leftSaber!.obj3D.position.x = -0.5
    result._leftSaber!.obj3D.rotation.x = -2 * Math.PI / 6
    result._rightSaber!.obj3D.position.x = 0.5
    result._rightSaber!.obj3D.rotation.x = -2 * Math.PI / 6
    return result
  }
}
