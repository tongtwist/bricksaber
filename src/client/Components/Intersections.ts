import {
	Raycaster,
	Intersection,
	Object3D,
	Vector3
} from "three"


export interface IIntersectionsProps {
	readonly from: Vector3
	readonly to: Vector3
	readonly near: number
	readonly far: number
	readonly objectsToTest?: Array<Object3D>
	readonly testChildren?: boolean
}

export class Intersections {
	private readonly _from: Vector3
	private readonly _to: Vector3
	private readonly _direction: Vector3
	private readonly _rayCaster: Raycaster
	private _objectsToTest: Array<Object3D>
	private readonly _testChildren: boolean
	private readonly _alreadyIntersected: Set<number>

	constructor (
		props: IIntersectionsProps
	) {
		this._from = props.from
		this._to = props.to
		this._direction = new Vector3()
		this._rayCaster = new Raycaster(
			this._from,
			this._to,
			props.near,
			props.far
		)
		this._objectsToTest = props.objectsToTest ?? []
		this._testChildren = props.testChildren ?? false
		this._alreadyIntersected = new Set<number>()
	}

	get objectsToTest () { return this._objectsToTest }
	set objectsToTest (v: Array<Object3D>) {
		this._objectsToTest = v ?? []
	}

	forgetAlreadyIntersected () {
		this._alreadyIntersected.clear()
	}

	list (testChildren?: boolean): Array<Intersection<Object3D>> {
		if (this._objectsToTest.length > 0) {
			this._direction.subVectors(this._to, this._from)
			this._direction.normalize()
			this._rayCaster.set(this._from, this._direction)
			return this._rayCaster.intersectObjects(
				this._objectsToTest,
				testChildren ?? this._testChildren
			)
		}
		return []
	}

	listNew (
		testChildren?: boolean
	): Array<Intersection<Object3D>> {
		const intersections: Array<Intersection<Object3D>> = this.list(testChildren)
		const result: Array<Intersection<Object3D>> = []
		for (const i of intersections) {
			if (!this._alreadyIntersected.has(i.object.id)) {
				this._alreadyIntersected.add(i.object.id)
				result.push(i)
			}
		}
		return result
	}
}