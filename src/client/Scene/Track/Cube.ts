import {
	BoxBufferGeometry,
	Mesh,
	MeshBasicMaterial
} from "three"
import { SceneNode } from "../../Templates"
import type { IBeatmapBlock } from "../../Components"


export interface ICubeProps {
	readonly x: number
	readonly y: number
	readonly rotation: number
	readonly m: Mesh
}

export class Cube extends SceneNode<Mesh> {
	private static _rotations = [
		Math.PI,
		0,
		-.5 * Math.PI,
		.5 * Math.PI,
		-.75 * Math.PI,
		.75 * Math.PI,
		-.25 * Math.PI,
		.25 * Math.PI,
		0
	]
	private static _cubeGeometry = new BoxBufferGeometry(0.8, 0.8, 0.8)
	private static _bm = new Mesh(
		Cube._cubeGeometry,
		new MeshBasicMaterial({ color: 0x0000ff })
	)
	private static _rm = new Mesh(
		Cube._cubeGeometry,
		new MeshBasicMaterial({ color: 0xff0000 })
	)

	private constructor (
		props: ICubeProps
	) {
		super(props.m)
		this._obj3D.position.x = props.x
		this._obj3D.position.y = props.y
		this._obj3D.rotation.z = props.rotation
	}

	static fromBM (
		block: IBeatmapBlock
	): Cube {
		return new Cube({
			x: block.lineIndex - 1.5,
			y: block.lineLayer - 1,
			rotation: Cube._rotations[
				Math.min(8, Math.max(0, block.cutDirection))
			],
			m: block.type === 0 ? Cube._bm.clone() : Cube._rm.clone()
		})
	}
}