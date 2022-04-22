import * as THREE from "three"

import {
	WithGUI,
	IWithGUI,
	IPropsWithGUIOptions
} from "../Components"
import { SceneNode } from "../Templates"
import Camera from "./Camera"
import Axes from "./Axes"
import Grid from "./Grid"
import Lane from "./Lane"
// import { Light } from "./Light"


export interface ISceneProps extends IPropsWithGUIOptions {
	readonly viewport: {
		readonly initialWidth: number
		readonly initialHeight: number
	}
}

export default class Scene extends SceneNode<THREE.Scene> {
	private readonly _textureLoader: THREE.TextureLoader
	private readonly _gui: IWithGUI

	readonly camera: Camera
	readonly grid: Grid
	readonly axes: Axes
	readonly lane: Lane

	constructor (props: ISceneProps) {
		super(new THREE.Scene())
		this._textureLoader = new THREE.TextureLoader()
		this._gui = WithGUI.createAndApply(this, props)
		this.camera = new Camera({
			fov: 55,
			aspect: props.viewport.initialWidth / Math.max(props.viewport.initialHeight, 1),
			near: 0.1,
			far: 100
		})
		this.grid = new Grid(this._gui.container)
		this.axes = new Axes(this._gui.container)
		this.lane = new Lane(this._gui.container)
		this.add(this.grid)
		this.add(this.axes)
		this.add(this.lane)
		console.log(this.lane)
	}

	renderingComputation(dt: number) {
		this.childrenRenderingComputations(dt)
	}
}