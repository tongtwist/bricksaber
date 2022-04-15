import { Object3D } from "three";

interface IChild {
  threeObject?: Object3D;
  renderComputation(time: number): void;
}

abstract class CompositeAbstract implements IChild {
  protected parent!: IChild;
  protected children: IChild[] = [];

  protected constructor(private _threeObject: Object3D) {}

  get threeObject(): Object3D {
    return this._threeObject;
  }

  public setParent(parent: IChild) {
    this.parent = parent;
  }

  public getParent(): IChild {
    return this.parent;
  }

  public add(child: IChild): void {
    console.log(child);
    this.children.push(child);
    if (child.threeObject) {
      this.threeObject.add(child.threeObject);
    }
  }

  public abstract renderComputation(time: number): void;
}

export { CompositeAbstract };
