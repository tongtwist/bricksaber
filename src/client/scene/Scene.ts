import { CompositeAbstract } from "./Composite";
import * as THREE from "three";

export default class Scene extends CompositeAbstract {
  public constructor() {
    super(new THREE.Scene());
  }

  get threeObject(): THREE.Scene {
    return super.threeObject as THREE.Scene;
  }

  public renderComputation(time: number): void {
    this.renderChildrenComputation(time);
  }
}
