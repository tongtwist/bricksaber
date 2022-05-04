import type { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import {
  Saber,
  ISaberProps
} from "../../Templates"


export default class LeftSaber extends Saber {
  private constructor(
    props: ISaberProps
  ) {
    super(props)
    this._gui.apply(this, props, {
      visible: { type: "boolean" },
      width: { type: "number", min: .05, max: 3, step: .05 },
      height: { type: "number", min: .05, max: 3, step: .05 },
      length: { type: "number", min: .05, max: 3, step: .05 }
    })
  }

  static async create (
    props: ISaberProps,
    gltfLoader: GLTFLoader
  ): Promise<Saber> {
    const result = new LeftSaber(props)
    await result._loadModel(
			gltfLoader,
			"/assets/models/redSaber.gltf",
			props.name
		)
		return result
  }
}
