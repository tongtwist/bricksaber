import * as THREE from "three";
import { CompositeAbstract } from "../scene/Composite";

export default class Grid extends CompositeAbstract {
  constructor() {
    const grid = new THREE.Group();
    super(grid);
  }

  renderComputation(time: number): void {
    this.threeObject.position.z += 0.001;
    // console.log("nhm")

    this.renderChildrenComputation(time);
  }
}
