import * as THREE from "three"
import { SceneNode } from "../SceneNode"
import { HitEvent } from "../../types"
import { IObstacle } from "./Obstacle"

export class Bomb extends SceneNode<THREE.Mesh> implements IObstacle {
  constructor() {
    const geometry = new THREE.SphereGeometry(1)
    const material = new THREE.MeshBasicMaterial({ color: 0x888888 })
    const cube = new THREE.Mesh(geometry, material)

    super(cube)
  }

  renderComputation(time: number): void {
    // Do nothing
  }

  handleHit(event: HitEvent): void {
    this.explode()
  }

  explode() {}
}