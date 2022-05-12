import {
  Mesh,
  Group,
  FrontSide,
  Object3D,
  MeshBasicMaterial
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
  protected readonly _gui: IWithGUI

  private constructor(props: IPlayerHeadProps) {
    super(new Group())
    this._gui = WithGUI.createAndApply(this, props, {
      visible: {type: "boolean"},
      width: {type: "number", min: 0.05, max: 5, step: 0.05},
      height: {type: "number", min: 0.05, max: 5, step: 0.05},
      length: {type: "number", min: 0.05, max: 5, step: 0.05},
    })
  }
  private _setChildren(child: Object3D) {
    this.obj3D.add(child)
  }

  get visible() { return this._obj3D.visible }
  set visible(v: boolean) { this._obj3D.visible = v }
  get width() { return this._obj3D.scale.x }
  set width(x: number) { this._obj3D.scale.x = x }
  get height() { return this._obj3D.scale.y }
  set height(y: number) { this._obj3D.scale.y = y }
  get length() { return this._obj3D.scale.z }
  set length(y: number) { this._obj3D.scale.z = y }

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
    const resultat: Object3D = model.scene
    resultat.rotation.x = Math.PI
    resultat.rotation.y = Math.PI
    resultat.position.y = 2.1
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
