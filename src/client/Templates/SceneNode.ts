import type { Object3D } from "three"


export interface ISceneNode<T extends Object3D = Object3D> {
	readonly name?: string
	readonly obj3D: T
	renderingComputation?: (t: number, dt: number, audioTime: number) => void
	add(...children: Array<ISceneNode>): void
}

type ISceneNodeWithRenderingComputation<T extends Object3D = Object3D>
	= Required<Pick<ISceneNode<T>, "renderingComputation">> & ISceneNode<T>

export abstract class SceneNode<T extends Object3D>
	implements ISceneNode<T>
{
	protected readonly _children: Array<ISceneNode> = []
	protected readonly _childrenByName: { [name: string]: ISceneNode } = {}
	protected readonly _childrenWithComputations: Array<ISceneNodeWithRenderingComputation> = []

	constructor (
		protected readonly _obj3D: T
	) {}

	get obj3D () { return this._obj3D }

	protected childrenRenderingComputations (
		t: number,
		dt: number,
		audioTime: number
	) {
		this._childrenWithComputations.forEach((child: ISceneNodeWithRenderingComputation) => {
			child.renderingComputation(t, dt, audioTime)
		})
	}

	add (...children: Array<ISceneNode>) {
		children.forEach((child: ISceneNode) => {
			this._children.push(child)
			child.name && (this._childrenByName[child.name] = child)
			child.renderingComputation && this._childrenWithComputations.push(
				child as ISceneNodeWithRenderingComputation
			)
			this._obj3D.add(child.obj3D)
		})
	}

	child(i: number | string): ISceneNode | undefined {
		if (typeof i === "number" && i < this._children.length) {
			return this._children[i]
		}
		if (typeof i === "string" && i in this._childrenByName) {
			return this._childrenByName[i]
		}
	}
}