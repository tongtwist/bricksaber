import type { GUIContainer } from "../../Components"
import {
  Group,
  OutsideDecorSquare
} from "../../Templates"
import Trail from "./Trail"
import { PlayerPlatform } from "./Platform"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"


export default class Decor extends Group {
  private readonly _track: PlayerPlatform
  private readonly _trail: Trail
  private readonly _outsideSquares: Array<OutsideDecorSquare>

  private constructor(
    parentGUIContainer: GUIContainer
  ) {
    super({
      name: "Decor",
      gui: { container: parentGUIContainer }
    })
    this._track = new PlayerPlatform(this._gui.container);
    this._trail = new Trail(this._gui.container);
    this._outsideSquares = []
    for(let i = 0; i < 10; i++) {
      const outside = new OutsideDecorSquare({
        name: `Outside Square ${i.toString()}`,
        y: 3,
        z: -i * 5 - 20,
        gui: { container: this._gui.container }
      })
      outside.obj3D.layers.enable(1)
      this._outsideSquares.push(outside)
    }
    this.add(this._track, this._trail, ...this._outsideSquares)
  }

  get track () { return this._track }
  get trail () { return this._trail }
  get outsideSquares () { return this._outsideSquares }

  static async create (
    parentContainer: GUIContainer,
    gltfLoader: GLTFLoader
  ): Promise<Decor> {
    return new Decor(parentContainer)
  }
}
