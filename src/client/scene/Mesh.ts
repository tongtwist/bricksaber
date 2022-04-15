import { CompositeAbstract } from "./Composite";
import * as THREE from "three"

export default class Mesh extends CompositeAbstract {

  public constructor(
      private _geometry: THREE.BufferGeometry,
      private _material: THREE.Material | THREE.Material[],
  ) {
    super(new THREE.Mesh(
        _geometry,
        _material,
    ));
  }

  public renderComputation(time: number): void {}

}