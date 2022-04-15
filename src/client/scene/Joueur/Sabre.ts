import * as THREE from "three";
import {IChild, CompositeAbstract} from "../Composite";

export class Sabre extends CompositeAbstract {
  public constructor() {
    super(
      new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 20, 32),
        new THREE.MeshBasicMaterial({
          color: 0xea80fc,
          wireframe: true,
        })
      )
    );
    this.threeObject.position.x = 0.5
  }

  public renderComputation(time: number): void {}
}

