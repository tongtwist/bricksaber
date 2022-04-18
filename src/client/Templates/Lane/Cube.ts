import * as THREE from "three"
import { Direction, HitEvent } from "../../types"
import { SceneNode } from "../SceneNode"
import { IObstacle } from "./Obstacle"

type CubeType = "Blue" | "Red"

export class Cube extends SceneNode<THREE.Mesh> implements IObstacle {
  constructor(private _type: CubeType, private _direction?: Direction) {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const color = Cube.getColor(_type)
    const material = new THREE.MeshBasicMaterial({ color })
    const cube = new THREE.Mesh(geometry, material)
    super(cube)
  }

  renderComputation(time: number): void {
    // Do nothing
    this.obj3D.rotation.x += 0.01
  }

  explode() {}

  handleHit(event: HitEvent): void {
    //   Si les conditions sont respectées
    //   Alors on appelle explode()
    //   this.explode()
    // throw new Error("Method not implemented.");

    this.explode()
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