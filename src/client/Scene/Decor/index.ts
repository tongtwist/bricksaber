import * as THREE from "three"

import type { GUIContainer } from "../../Components"
import { Group } from "../../Templates"
import PlayerPlatform from "./PlayerPlatform"
import Platform2 from "./Platform2"


export default class Decor extends Group {
  readonly playerPlatform: PlayerPlatform
  readonly platform2: Platform2

	constructor(parentGUIContainer: GUIContainer) {
    super({
      name: "Decor",
      gui: { container: parentGUIContainer }
    })
    this.playerPlatform = new PlayerPlatform(this._gui.container)
    this.platform2 = new Platform2(this._gui.container)
    this.add(this.playerPlatform)
    this.add(this.platform2)
  }
}