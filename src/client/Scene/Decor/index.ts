import * as THREE from "three"

import type { GUIContainer } from "../../Components"
import { Group } from "../../Templates"
import Platform1 from "./Platform1"
import Platform2 from "./Platform2"


export default class Decor extends Group {
  readonly platform1: Platform1
  readonly platform2: Platform2

	constructor(parentGUIContainer: GUIContainer) {
    super({
      name: "Decor",
      gui: { container: parentGUIContainer }
    })
    this.platform1 = new Platform1(this._gui.container)
    this.platform2 = new Platform2(this._gui.container)
    this.add(this.platform1)
    this.add(this.platform2)
  }
}