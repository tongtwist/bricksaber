import * as THREE from "three";
import { ISceneNode, SceneNode } from "../SceneNode";

export class LaneGrid extends SceneNode<THREE.Group> {
  constructor(private _bpm: number) {
    const grid = new THREE.Group();
    super(grid);
  }

  // renderingComputation(dt: number): void {
  //   // const speed = this._bpm / 60
  //   // const deltaZ = speed * dt;

  //   // this.obj3D.position.z += deltaZ;

  //   this.childrenRenderingComputations(dt);
  // }

  addToCell(child: ISceneNode, positionX: number, positionY: number) {
    if (positionX < 0 || positionX > 3 || positionY < 0 || positionY > 2) {
      return;
    }

    this.add(child);
    // calcul details
    // 0.5 is an offset of half a cube size, used to make the edges of the cube "touch" the center
    // cube is 1 in size, so we directly use positionX and positionY to move it
    // -2 is because we want the X axis to be "centered" (4 in width)
    // multiplied by 1.2 to create a gap between the elements
    // child.obj3D.position.x = (0.5 + positionX - 2) * 1.2;
    // child.obj3D.position.y = (0.5 + positionY) * 1.2;
    child.obj3D.position.x = 0.5 + positionX - 2;
    child.obj3D.position.y = 2 + positionY;
  }
}
