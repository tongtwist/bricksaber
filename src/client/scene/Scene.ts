import { CompositeAbstract } from "./Composite";
import * as THREE from "three";
import { Joueur } from "./Joueur/index";

export default class Scene extends CompositeAbstract {
  public constructor() {
    super(new THREE.Scene());

    const joueur = new Joueur()

    this.add(joueur)
  }

  public renderComputation(time: number): void {}
}
