import type { GUIContainer } from "../../Components";
import { Group, Cube, LaneGrid, Bomb } from "../../Templates";

export default class Lane extends Group {
  // readonly grid: LaneGrid;
  // readonly cube: Cube;
  // readonly bomb: Bomb;

  constructor(parentGUIContainer: GUIContainer) {
    super({
      name: "Lane",
      gui: { container: parentGUIContainer },
    });

    const cubeGeo = Cube.getGeometry();

    // Temporary "beatmap" creation
    [...Array(5).keys()].forEach((key) => {
      const cube = new Cube({ type: "Blue", geometry: cubeGeo });
      const cube1 = new Cube({ type: "Red", geometry: cubeGeo });
      const cube2 = new Cube({ type: "Blue", geometry: cubeGeo });
      const cube3 = new Cube({ type: "Red", geometry: cubeGeo });

      const bomb = new Bomb();
      bomb.obj3D.position.x = 4;

      const grid = new LaneGrid();
      grid.obj3D.position.z = -key * 4;
      grid.add(bomb);
      grid.addToCell(cube, 0, 0);
      grid.addToCell(cube1, 1, 1);
      grid.addToCell(cube2, 1, 2);
      grid.addToCell(cube3, 2, 1);
      grid.addToCell(bomb, 2, 2);
      this.add(grid);
    });
  }
}
