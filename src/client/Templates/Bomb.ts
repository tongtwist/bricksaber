import * as THREE from "three"
import { SceneNode } from "./SceneNode"
import Obstacle from "./Obstacle"

export default class Bomb extends SceneNode<THREE.Mesh> implements Obstacle {
  constructor() {
    const geometry = new THREE.SphereGeometry(1)
    const material = new THREE.MeshBasicMaterial({ color: 0x888888 })
    const cube = new THREE.Mesh(geometry, material)

    super(cube)
  }

  renderComputation(time: number): void {
    // Do nothing
  }

  handleHit(): void {
    this.explode()
  }

  explode() {}
}
