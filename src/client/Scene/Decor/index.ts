import type { GUIContainer } from "../../Components"
import { Group } from "../../Templates"
import Trail from "./Trail/Trail";
import { PlayerPlatform } from "./Platform/Platform";


export default class Decor extends Group {
  readonly track: PlayerPlatform
  readonly trail: Trail


	constructor(parentGUIContainer: GUIContainer) {
    super({
      name: "Decor",
      gui: { container: parentGUIContainer }
    })
    this.track = new PlayerPlatform(this._gui.container)
    this.trail = new Trail(this._gui.container);
    this.add(this.track)
    this.add(this.trail)


  }
}