import { CompositeAbstract } from "./Composite";
import * as THREE from "three"

class Light extends CompositeAbstract {

  public constructor() {
    super(new THREE.Light());
  }

  public renderComputation(time: number): void {

  }

}