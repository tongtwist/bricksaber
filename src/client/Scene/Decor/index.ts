import type { GUIContainer } from "../../Components"
import { Group } from "../../Templates"
import { Light } from "../../Templates/Light"
import AmbientLight from "./AmbientLight"
import PlayerPlatform from "./PlayerPlatform"
import Platform2 from "./Platform2"


export default class Decor extends Group {
  readonly playerPlatform: PlayerPlatform
  readonly platform2: Platform2
  readonly ambientLight : Light

	constructor(parentGUIContainer: GUIContainer) {
    super({
      name: "Decor",
      gui: { container: parentGUIContainer }
    })
    this.playerPlatform = new PlayerPlatform(this._gui.container)
    this.platform2 = new Platform2(this._gui.container)
    this.add(this.playerPlatform)
    this.add(this.platform2)
    this.ambientLight = new AmbientLight(this._gui.container);
    this.add(this.ambientLight);

  }
}