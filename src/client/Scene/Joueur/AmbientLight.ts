import * as THREE from "three";
import {SceneNode} from "../../Templates";

export class AmbientLight extends SceneNode<THREE.Light> {
  public constructor() {
    super(new THREE.AmbientLight(0x9eaeff, 0.2));
  }
}
