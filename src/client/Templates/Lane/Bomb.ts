import * as THREE from "three"
import { SceneNode } from "../SceneNode"


export class Bomb extends SceneNode<THREE.Mesh> {
  constructor() {
    const geometry = new THREE.SphereGeometry(0.4)
    const material = new THREE.MeshBasicMaterial({ color: 0x888888 })
    const cube = new THREE.Mesh(geometry, material)

    super(cube)
  }

  renderingComputation(
    t: number,
    dt: number,
    audioTime: number
  ): void {
    // Do nothing
  }
}