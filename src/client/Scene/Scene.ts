import { CompositeAbstract } from "./Composite";
import * as THREE from "three";

export default class Scene extends CompositeAbstract {
  public constructor() {
    super(new THREE.Scene());
  }

  public renderComputation(time: number): void {}
}
