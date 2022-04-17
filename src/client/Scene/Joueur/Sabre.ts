import * as THREE from "three";
import { SceneNode } from "../../Templates"

export class Sabre extends SceneNode<THREE.Mesh> {
  public constructor() {
    super(
      new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 20, 32),
        new THREE.MeshBasicMaterial({
          color: 0xea80fc,
          wireframe: true,
        })
      )
    )
    this._obj3D.position.x = 0.5
  }

  public renderComputation(time: number): void {}
}

