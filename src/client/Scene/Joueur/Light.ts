import * as THREE from "three";
import {SceneNode} from "../../Templates";

export class Light extends SceneNode<THREE.Light> {
  public constructor() {
    super(new THREE.DirectionalLight(0xffffff, 1));

    this._obj3D.position.set(5, 5, 5);
  }
}
