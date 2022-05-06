import * as THREE from "three"
import { SceneNode } from "../SceneNode"


type CubeType = "Blue" | "Red"

interface ICubeOptions {
  type: CubeType
  direction: number
  geometry?: THREE.BufferGeometry
}

export class Cube extends SceneNode<THREE.Mesh> {
  constructor(private _options: ICubeOptions) {
    if (!_options.geometry) {
      _options.geometry = Cube.getGeometry()
    }

    const color = Cube.getColor(_options.type)
    const material = new THREE.MeshBasicMaterial({ color })
    const cube = new THREE.Mesh(_options.geometry, material)
    super(cube)
  }

  renderingComputation(
    t: number,
    dt: number,
    audioTime: number
  ): void {
    // Do nothing
  }

  explode() {}

  private static getColor(type: CubeType): THREE.Color {
    switch (type) {
      case "Blue":
        return new THREE.Color(0x2064a8);

      case "Red":
      default:
        return new THREE.Color(0xa82020);
    }
  }

  static getGeometry(): THREE.BoxGeometry {
    return new THREE.BoxGeometry(0.8, 0.8, 0.8);
  }
}
