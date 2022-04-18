import * as THREE from "three"
import { SceneNode } from "../../Templates"
import { Sabre } from "./Sabre"

export class Joueur extends SceneNode<THREE.Mesh> {

    public constructor(){
        super(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1, 1),
            new THREE.MeshBasicMaterial({
              color:  0xe91e63,
              wireframe: true,
            })
        ))
        const sabre = new Sabre()
        this.add(sabre)
    }
    public renderComputation(time: number): void {}
}