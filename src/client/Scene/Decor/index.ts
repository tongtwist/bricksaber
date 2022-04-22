import type { GUIContainer } from "../../Components"
import { Group } from "../../Templates"
import Trail from "./Trail/Trail";
import { PlayerPlatform } from "./Platform/Platform";
import OutsideDecorSquare from "./OutsideDecorSquare";

export default class Decor extends Group {
  readonly track: PlayerPlatform
  readonly trail: Trail

  constructor(parentGUIContainer: GUIContainer) {
    super({
      name: "Decor",
      gui: { container: parentGUIContainer }
    })
    this.track = new PlayerPlatform(this._gui.container);
    this.trail = new Trail(this._gui.container);

    for(let i = 1; i < 10; i++) {
      const outside = new OutsideDecorSquare(this._gui.container,i.toString(),i);
      outside.obj3D.layers.enable(1);
      this.add(outside);
    }


    this.add(this.track)
    this.add(this.trail)
    

  }
}
