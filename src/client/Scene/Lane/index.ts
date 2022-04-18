import type { GUIContainer } from "../../Components"
import {
  Group,
  Cube,
  LaneGrid,
  Bomb
} from "../../Templates"



export default class Lane extends Group {
  readonly grid: LaneGrid
  readonly cube: Cube
  readonly bomb: Bomb

	constructor(parentGUIContainer: GUIContainer) {
    super({
      name: "Lane",
      gui: { container: parentGUIContainer }
    })
    this.cube = new Cube("Blue")
    this.bomb = new Bomb()
    this.grid = new LaneGrid()
    this.bomb.obj3D.position.x = 4
    this.grid.add(this.bomb)
    this.grid.add(this.cube)
  }
}