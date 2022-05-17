import {
	Group,
	Mesh,
	BufferGeometry,
	BufferAttribute,
	MeshBasicMaterial,
	Vector3,
	DoubleSide,
	DynamicDrawUsage,
	Object3D,
	Intersection,
	SphereBufferGeometry
} from "three"
import { CrossFinder } from "../../Components"


export interface ITrailProps {
	readonly name: string
	readonly steps: number
	readonly color: number
	readonly sensorsNum: number
}

export class Trail {
	private readonly _group: Group
	private readonly _name: string
	private readonly _steps: number
	private readonly _color: number
	private readonly _coords: Array<Array<Vector3>>
	private readonly _tempCoords: Array<[Vector3, Vector3]>
	private readonly _faces: Array<Mesh>
	private readonly _sensorsPoints: [ Array<Vector3>, Array<Vector3> ]
	private readonly _sensorsRange: Array<[Vector3, number]>
	private readonly _sensors: Array<CrossFinder>
	private readonly _collisions: Array<Array<Intersection<Object3D>>>

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
		this._sensorsPoints = [[], []]
		this._sensors = []
		this._sensorsRange = []
		for (let i = 0; i < props.sensorsNum; i++) {
			this._sensorsPoints[0].push(new Vector3())
			this._sensorsPoints[1].push(new Vector3())
			this._sensors.push(new CrossFinder({
				from: this._sensorsPoints[1][i],
				to: this._sensorsPoints[0][i],
				near: 0,
				far: 6,
				testChildren: true
			}))
			this._sensorsRange.push([ new Vector3(), 0 ])
		}
		this._collisions
			= props.sensorsNum > 0
			? Array(props.sensorsNum)
			: []
		this._group.add(...this._faces)
	}

	get group () { return this._group }
	get objectsToTest () {
		return this._sensors.length > 0
			? this._sensors[0].objectsToTest
			: []
	}
	set objectsToTest (v: Array<Object3D>) {
		this._sensors.forEach((s: CrossFinder) => s.objectsToTest = v)
	}

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

	private _computeSensorPoints (
		points: Array<Vector3>,
		p1: Vector3,
		p2: Vector3
	): void {
		if (points.length === 0) {
			return
		}
		const step = this._tempCoords[0][0]
		step.copy(p2).sub(p1)
		if (points.length === 1) {
			step.divideScalar(2)
			points[0].copy(step)
				.add(p1)
		} else {
			step.divideScalar(points.length - 1)
			for (let i = 0; i < points.length; i++) {
				points[i].copy(step)
					.multiplyScalar(i)
					.add(p1)
			}
		}
	}

	private _computeSensorRanges (): void {
		for (let i = 0; i < this._sensors.length; i++) {
			const r = this._sensorsRange[i]
			r[0].copy(this._sensorsPoints[1][i])
				.sub(this._sensorsPoints[0][i])
			r[1] = r[0].length()
		}
	}

	moveForward (
		p1: Vector3,
		p2: Vector3
	) {
		this._computeSensorPoints(this._sensorsPoints[0], p1, p2)
		this._tempCoords[0][0].copy(p1)
		this._tempCoords[0][1].copy(p2)
		for (let i = 0; i < this._steps; i++) {
			const newOffset = i & 1
			const n: [Vector3, Vector3] = this._tempCoords[newOffset]
			const s: [Vector3, Vector3] = this._tempCoords[1 - newOffset]
			const pos = this._faces[i].geometry.attributes["position"] as BufferAttribute
			s[0].set(pos.getX(2), pos.getY(2), pos.getZ(2))
			s[1].set(pos.getX(0), pos.getY(0), pos.getZ(0))
			pos.setXYZ(3, pos.getX(2), pos.getY(2), pos.getZ(2))
			pos.setXYZ(1, pos.getX(0), pos.getY(0), pos.getZ(0))
			pos.setXYZ(5, pos.getX(0), pos.getY(0), pos.getZ(0))
			pos.setXYZ(2, n[0].x, n[0].y, n[0].z)
			pos.setXYZ(4, n[0].x, n[0].y, n[0].z)
			pos.setXYZ(0, n[1].x, n[1].y, n[1].z)
			pos.needsUpdate = true
			if (i === 0) {
				this._computeSensorPoints(this._sensorsPoints[1], s[0], s[1])
				this._computeSensorRanges()
			}
		}
		this._faces[0].geometry.computeBoundingBox()
		this._faces[0].geometry.computeBoundingSphere()
	}

	collisions (): Array<Array<Intersection<Object3D>>> {
		for (let i = 0; i < this._sensors.length; i++) {
			this._collisions[i] = this._sensors[i].listNew(true, this._sensorsRange[i][1])
		}
		return this._collisions
	}
}