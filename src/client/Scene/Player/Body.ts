import {
  Mesh,
  Group as ThreeGroup,
  Object3D
} from "three"
import type {
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
import { SceneNode } from "../../Templates/SceneNode"

export interface IPlayerBodyGUIProperties extends GUIProperties {
  readonly visible: IGUIBooleanProperty
  readonly width: IGUINumberProperty
  readonly height: IGUINumberProperty
  readonly length: IGUINumberProperty
}

export interface IPlayerBodyProps
  extends IPropsWithGUIOptions<IPlayerBodyGUIProperties>
{
  readonly visible?: boolean
  readonly width?: number
  readonly height?: number
  readonly length?: number
}

export default class Body extends SceneNode<Object3D> {
  protected readonly _gui: IWithGUI

  private constructor(props: IPlayerBodyProps) {
    super(new ThreeGroup())
    this._gui = WithGUI.createAndApply(this, props, {
      visible: {type: "boolean"},
      width: {type: "number", min: 0.1, max: 10, step: 0.1},
      height: {type: "number", min: 0.1, max: 10, step: 0.1},
      length: {type: "number", min: 0.1, max: 10, step: 0.1},
    })
  }

  private _setChildren(child: Object3D) {
    this._obj3D.add(child)
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
    resultat.scale.x *= .6
    resultat.rotation.y = Math.PI
    this._setChildren(resultat)
  }

  static async create(
    props: IPlayerBodyProps,
    gltfLoader: GLTFLoader
  ): Promise<Body> {
    const result = new Body(props)
    await result._loadModel(
      gltfLoader,
      "/assets/models/bodyspider.gltf",
      props.name
    )
    return result
  }
}
