import {
  Mesh,
  Group,
  MeshStandardMaterial,
  FrontSide
} from "three"
import {
  GLTF,
  GLTFLoader
} from "three/examples/jsm/loaders/GLTFLoader"

import {
  GUIProperties,
  IGUIBooleanProperty,
  IGUINumberProperty,
  IPropsWithGUIOptions,
  IWithGUI,
  WithGUI,
} from "../../Components"
import {SceneNode} from "../../Templates/SceneNode"

export interface IPlayerHeadGUIProperties extends GUIProperties {
  readonly visible: IGUIBooleanProperty
  readonly width: IGUINumberProperty
  readonly height: IGUINumberProperty
  readonly length: IGUINumberProperty
}

export interface IPlayerHeadProps
  extends IPropsWithGUIOptions<IPlayerHeadGUIProperties>
{
  readonly visible?: boolean
  readonly width?: number
  readonly height?: number
  readonly length?: number
}

export default class Head extends SceneNode<Group> {
  private readonly _initialWidth: number
  private readonly _initialHeight: number
  private readonly _initialLength: number
  protected readonly _gui: IWithGUI

  private constructor(props: IPlayerHeadProps) {
    const initialWidth = props.width ?? 1.4
    const initialHeight = props.height ?? 1.4
    const initialLength = props.length ?? 1.4
    super(new Group())
    this._initialWidth = initialWidth
    this._initialHeight = initialHeight
    this._initialLength = initialLength
    this._obj3D.position.y = 1.65
    this._gui = WithGUI.createAndApply(this, props, {
      visible: {type: "boolean"},
      width: {type: "number", min: 0, max: 5, step: 0.05},
      height: {type: "number", min: 0.05, max: 1, step: 0.05},
      length: {type: "number", min: 10, max: 200, step: 0.1},
    })
  }
  private _setChildren(child: Mesh) {
    this.obj3D.add(child)
  }

  get visible() {
    return this._obj3D.visible
  }
  set visible(v: boolean) {
    this._obj3D.visible = v
  }
  get width() {
    return this._obj3D.scale.x * this._initialWidth
  }
  set width(x: number) {
    this._obj3D.scale.x = x / this._initialWidth
  }
  get height() {
    return this._obj3D.scale.y * this._initialHeight
  }
  set height(y: number) {
    this._obj3D.scale.y = y / this._initialHeight
  }
  get length() {
    return this._obj3D.scale.z * this._initialLength
  }
  set length(y: number) {
    this._obj3D.scale.z = y / this._initialLength
  }

  protected async _loadModel(
    gltfLoader: GLTFLoader,
    url: string,
    name: string
  ): Promise<void> {
    const model: GLTF = await gltfLoader.loadAsync(url, (progress) =>
      console.log(
        `Scene->Player->"${name}": model load progress: ${JSON.stringify(
          progress
        )}`
      )
    )

    const resultat: Mesh = model.scene.children[0].children[0].children[0].children[0].children[0] as Mesh
    (resultat.material as MeshStandardMaterial).side = FrontSide
    this._setChildren(resultat)
  }

  static async create(
    props: IPlayerHeadProps,
    gltfLoader: GLTFLoader
  ): Promise<Head> {
    const result = new Head(props)
    await result._loadModel(
      gltfLoader,
      "/assets/models/headspider.gltf",
      props.name
    )
    return result
  }
}
