interface IChild {
    renderComputation(): void
}

abstract class CompositeAbstract {
    protected parent!: IChild;
    protected children!: IChild[];

    public setParent(parent: IChild) {
        this.parent = parent;
    }

    public getParent(): IChild {
        return this.parent;
    }

    public add(child: IChild): void {
        this.children.push(child)
        child.renderComputation()
    }

}

export { IChild };