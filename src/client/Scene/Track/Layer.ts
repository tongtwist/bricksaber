import {
	Mesh,
	MeshBasicMaterial,
	BoxGeometry
} from "three"
import {
	IPropsWithGUIOptions,
	IBeatmapBlock,
	IBeatmapWall
} from "../../Components"
import {
	Group
} from "../../Templates"
import { Cube } from "./Cube"
import { Wall } from "./Wall"


export interface ITrackLayerProps extends IPropsWithGUIOptions {
	readonly visible?: boolean
	readonly z: number
	readonly walls: Array<IBeatmapWall>
	readonly cubes: Array<IBeatmapBlock>
	readonly mines: Array<any>
}

export class TrackLayer extends Group {
	private readonly _walls: Array<Wall>
	private readonly _cubes: Array<Cube>
	private readonly _mines: Array<any>
	private _zone?: Mesh

	constructor (
		props: ITrackLayerProps
	) {
		super({
			...props,
			visible: props.visible ?? false
		})
		this._walls = props.walls.map(Wall.fromBM)
		this._cubes = props.cubes.map(Cube.fromBM)
		this._mines = []
		this._obj3D.position.z = props.z
		this._obj3D.position.y = 2
		//this._layerHelper()
		this.add(...this._walls)
		this.add(...this._cubes)
	}

	private _layerHelper() {
		this._zone = new Mesh(
			new BoxGeometry(4, 3, 1),
			new MeshBasicMaterial({
				color: 0xffff00,
				wireframe: true
			})
		)
		this._obj3D.add(this._zone)
	}
}