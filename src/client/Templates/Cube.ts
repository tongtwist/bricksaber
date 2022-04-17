import * as THREE from "three"
import { SceneNode } from "./SceneNode"
import Obstacle from "./Obstacle"

export default class Cube extends SceneNode<THREE.Mesh> implements Obstacle {
  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)

    super(cube)
  }

  renderComputation(time: number): void {
    // Do nothing
  }

  explode() {}

  handleHit(): void {
    //   Si les conditions sont respectées
    //   Alors on appelle explode()
    //   this.explode()
    // throw new Error("Method not implemented.");

    this.explode()
  }

  //   This could be developed later
  //   cut() {}
}
