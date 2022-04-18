import * as THREE from "three"

import { SceneNode } from "./SceneNode"


export interface IPerspectiveCameraProps {
	readonly fov: number
	readonly aspect: number
	readonly near: number
	readonly far: number
	readonly x?: number
	readonly y?: number
	readonly z?: number
}

export class PerspectiveCamera extends SceneNode<THREE.PerspectiveCamera> {
	constructor (props: IPerspectiveCameraProps) {
		super(new THREE.PerspectiveCamera(props.fov, props.aspect, props.near, props.far))
		typeof props.x === "number" && (this._obj3D.position.x = props.x)
		typeof props.y === "number" && (this._obj3D.position.y = props.y)
		typeof props.z === "number" && (this._obj3D.position.z = props.z)
	}

	setAspect (width: number, height: number) {
		this._obj3D.aspect = width / Math.max(1, height)
		this._obj3D.updateProjectionMatrix()
	}
}