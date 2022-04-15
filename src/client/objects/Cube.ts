import * as THREE from "three";
import { Direction, HitEvent } from "../types";
import { CompositeAbstract } from "../scene/Composite";
import Obstacle from "./Obstacle";

type CubeType = "Blue" | "Red";

export default class Cube extends CompositeAbstract implements Obstacle {
  constructor(private _type: CubeType, private _direction?: Direction) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const color = Cube.getColor(_type);
    const material = new THREE.MeshBasicMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    super(cube);
  }

  renderComputation(time: number): void {
    // Do nothing
  }

  explode() {}

  handleHit(event: HitEvent): void {
    this.explode();
  }

  //   This could be developed later
  //   cut() {}

  private static getColor(type: CubeType): THREE.Color {
    switch (type) {
      case "Blue":
        return new THREE.Color(0x0000ff);

      case "Red":
      default:
        return new THREE.Color(0xff0000);
    }
  }
}
