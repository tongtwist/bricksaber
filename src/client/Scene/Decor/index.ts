import type { GUIContainer } from "../../Components"
import { Border, OutsideDecorSquare } from "../../Templates/Decor"
import {
  Group,
} from "../../Templates"
import Trail from "./Trail"
import { PlayerPlatform } from "./Platform"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"


export default class Decor extends Group {
  private readonly _track: PlayerPlatform
  private readonly _trail: Trail
  private readonly _outsideSquares: Array<OutsideDecorSquare>
  private readonly _outsideSticks: Array<Border>

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
        z: -i * (40 / 9) - 10 - 1,
        gui: { container: this._gui.container }
      })
      outside.obj3D.layers.enable(1)
      this._outsideSquares.push(outside)
    }

    //TO REFACTO
    this._outsideSticks = [];
    for(let i = 1; i < 6; i++) {
      const outside = new Border({
        name: `Outside Stick ${i.toString()}`,
        width:4,
        x: 15 + i,
        y: 0 + i,
        z: -5 - i * i * 2 ,
        color: 0xff0000,
        gui: { container: this._gui.container }
      })
      outside.obj3D.rotation.z = 7 + i * 0.115
      outside.obj3D.layers.enable(1)
      this._outsideSticks.push(outside)
    }

    for(let i = 1; i < 6; i++) {
      const outside = new Border({
        name: `Outside Stick ${i.toString()}${i.toString()}`,
        width:4,
        x: -15 - i,
        y: 0 - i,
        z: -5 - i * i * 2 ,
        color: 0xff0000,
        gui: { container: this._gui.container }
      })
      outside.obj3D.rotation.z = -8 + i * 0.115
      outside.obj3D.layers.enable(1)
      this._outsideSticks.push(outside)
    }    

    this.add(this._track, this._trail, ...this._outsideSquares,...this._outsideSticks)
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
