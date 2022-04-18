import * as THREE from "three"
import { SceneNode } from "../SceneNode"

export class LaneGrid extends SceneNode<THREE.Group> {
  constructor() {
    const grid = new THREE.Group();
    super(grid);
  }

  renderComputation(time: number): void {
    this.obj3D.position.z += 0.001;
    // console.log("nhm")

    this.childrenRenderingComputations(time)
  }
}
