import * as THREE from "three";
import {IChild, CompositeAbstract} from "../Composite";

export class Sabre extends CompositeAbstract {
  public constructor() {
    super(
      new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 20, 32),
        new THREE.MeshBasicMaterial({
          color: 0xffff00,
          wireframe: true,
        })
      )
    );
  }

  public renderComputation(time: number): void {}
}

// camera.position.z = 20

// function animate() {
//   cylinder.rotation.x += 0.01
//   cylinder.rotation.y += 0.01
//   renderer.render(scene, camera)
//   requestAnimationFrame(animate)
// }

// animate()
