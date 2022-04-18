import { CompositeAbstract } from "./Composite";
import * as THREE from "three"

export default class PerspectiveCamera extends CompositeAbstract {

    public constructor(
        private _fov: number,
        private _aspect: number,
        private _near: number,
        private _far: number,
    ) {
        super(new THREE.PerspectiveCamera(_fov, _aspect, _near, _far));
    }

    public renderComputation(time: number): void { }

}