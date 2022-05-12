import {
	BoxBufferGeometry,
	Mesh,
	MeshBasicMaterial
} from "three"
import { SceneNode } from "../../Templates"
import type { IBeatmapWall } from "../../Components"


export interface IWallProps {
	readonly vertical: boolean
	readonly pos: number
	readonly size: number
	readonly duration: number
	readonly m: Mesh
}

export class Wall extends SceneNode<Mesh> {
	private static _m = new Mesh(
		new BoxBufferGeometry(),
		new MeshBasicMaterial({ color: 0xd0d0d0, wireframe: true })
	)

	private constructor (
		props: IWallProps
	) {
		super(props.m)
		if (props.vertical) {
			this._obj3D.position.x = props.pos - 1.5
			this._obj3D.position.y = 0
			this._obj3D.scale.x = props.size
			this._obj3D.scale.y = 3
		} else {
			this._obj3D.position.x = -2
			this._obj3D.position.y = props.pos
			this._obj3D.scale.x = 4
			this._obj3D.scale.y = props.size
		}
		this._obj3D.scale.z = props.duration * 4
		this._obj3D.position.z = -props.duration / 2
	}

	static fromBM (
		wall: IBeatmapWall
	): Wall {
		return new Wall({
			vertical: wall.type === 0,
			pos: wall.lineIndex,
			size: wall.width,
			duration: wall.duration,
			m: Wall._m.clone()
		})
	}
}