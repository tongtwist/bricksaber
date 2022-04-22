import * as THREE from "three";
import { SceneNode } from "../../Templates"

export class Sabre extends SceneNode<THREE.Mesh> {

  public constructor() {
    const geometry =  new THREE.CylinderGeometry(0.09, 0.09, 3, 6)
    super(
      new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
          color: 0xea80fc,
          wireframe: true,
        })
      )
    )
  }

  public renderComputation(time: number): void {}
}

