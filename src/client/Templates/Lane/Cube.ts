import * as THREE from "three";
import { Direction, HitEvent } from "../../types";
import { SceneNode } from "../SceneNode";
import { IObstacle } from "./Obstacle";

type CubeType = "Blue" | "Red";

interface ICubeOptions {
  type: CubeType;
  direction?: Direction;
  geometry?: THREE.BufferGeometry;
}

export class Cube extends SceneNode<THREE.Mesh> implements IObstacle {
  constructor(private _options: ICubeOptions) {
    if (!_options.geometry) {
      _options.geometry = Cube.getGeometry();
    }

    const color = Cube.getColor(_options.type);
    const material = new THREE.MeshBasicMaterial({ color });
    const cube = new THREE.Mesh(_options.geometry, material);
    super(cube);
  }

  renderingComputation(time: number): void {
    // Do nothing
  }

  explode() {}

  handleHit(event: HitEvent): void {
    //   Si les conditions sont respectées
    //   Alors on appelle explode()
    //   this.explode()
    // throw new Error("Method not implemented.");

    this.explode();
  }

  //   This could be developed later
  //   cut() {}

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
