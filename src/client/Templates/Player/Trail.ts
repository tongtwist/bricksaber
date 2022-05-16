import {
	Group,
	Mesh,
	BufferGeometry,
	BufferAttribute,
	MeshBasicMaterial,
	Vector3,
	DoubleSide,
	DynamicDrawUsage
} from "three"


export interface ITrailProps {
	readonly name: string
	readonly steps: number
	readonly color: number
}

export class Trail {
	private readonly _group: Group
	private readonly _name: string
	private readonly _steps: number
	private readonly _color: number
	private readonly _coords: Array<Array<Vector3>>
	private readonly _tempCoords: Array<[Vector3, Vector3]>
	private readonly _faces: Array<Mesh>

	constructor (
		props: ITrailProps
	) {
		this._group = new Group()
		this._name = props.name
		this._group.name = props.name
		this._group.visible = true
		this._steps = props.steps
		this._color = props.color
		this._coords = []
		this._tempCoords = [
			[ new Vector3(), new Vector3() ],
			[ new Vector3(), new Vector3() ]
		]
		this._faces = this._buildFaces()
		this._group.add(...this._faces)
	}

	get group () { return this._group }

	private _buildFaces (): Array<Mesh> {
		const result: Array<Mesh> = []
		for (let i = 0; i < this._steps; i++) {
			const coords = new Float32Array(3 * 6)
			const subVectors: Array<Vector3> = []
			for (let j = 0; j < 6; j++) {
				coords[3 * j] = Math.random() * 3
				coords[3 * j + 1] = Math.random() * 3
				coords[3 * j + 2] = Math.random() * 3
				subVectors.push(new Vector3(
					coords[3 * j],
					coords[3 * j + 1],
					coords[3 * j + 2]
				))
			}
			this._coords.push(subVectors)
			const attributes = new BufferAttribute(coords, 3)
			attributes.setUsage(DynamicDrawUsage)
			const geometry = new BufferGeometry()
			geometry.setAttribute("position", attributes)
			const face = new Mesh(
				geometry,
				new MeshBasicMaterial({
					transparent: true,
					opacity: 1 - i / this._steps,
					color: this._color,
					visible: true,
					side: DoubleSide
				})
			)
			face.name = `${this._name}#${i.toString()}`
			face.visible = true
			result[i] = face
		}
		return result
	}

	moveForward (
		p1: Vector3,
		p2: Vector3
	) {
		this._tempCoords[0][0].set(p1.x, p1.y, p1.z)
		this._tempCoords[0][1].set(p2.x, p2.y, p2.z)
		for (let i = 0; i < this._steps; i++) {
			const newOffset = i & 1
			const newCoords: [Vector3, Vector3] = this._tempCoords[newOffset]
			const savedCoords: [Vector3, Vector3] = this._tempCoords[1 - newOffset]
			const pos = this._faces[i].geometry.attributes["position"] as BufferAttribute
			savedCoords[0].set(pos.getX(2), pos.getY(2), pos.getZ(2))
			savedCoords[1].set(pos.getX(0), pos.getY(0), pos.getZ(0))
			pos.setXYZ(3, pos.getX(2), pos.getY(2), pos.getZ(2))
			pos.setXYZ(1, pos.getX(0), pos.getY(0), pos.getZ(0))
			pos.setXYZ(5, pos.getX(0), pos.getY(0), pos.getZ(0))
			pos.setXYZ(2, newCoords[0].x, newCoords[0].y, newCoords[0].z)
			pos.setXYZ(4, newCoords[0].x, newCoords[0].y, newCoords[0].z)
			pos.setXYZ(0, newCoords[1].x, newCoords[1].y, newCoords[1].z)
			pos.needsUpdate = true
		}
		this._faces[0].geometry.computeBoundingBox()
		this._faces[0].geometry.computeBoundingSphere()
	}
}