import * as THREE from "three"

import { SceneNode } from "../Templates"


export class Light extends SceneNode<THREE.Light> {

  public constructor() {
    super(new THREE.Light());
  }
}