import { Object3D } from "three";

interface IChild {
    renderComputation(time: number): void
}

abstract class CompositeAbstract implements IChild {
    protected parent!: IChild;
    protected children!: IChild[];
    protected threeObject: Object3D

    protected constructor(threeObject: Object3D) {
        this.threeObject = threeObject
    }

    public setParent(parent: IChild) {
        this.parent = parent;
    }

    public getParent(): IChild {
        return this.parent;
    }

    public add(child: IChild): void {
        this.children.push(child)
    }

    public abstract renderComputation(time: number): void

}


export {CompositeAbstract}