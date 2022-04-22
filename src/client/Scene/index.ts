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
import { Joueur } from "./Joueur/index"


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
	readonly joueur: Joueur

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
		this.joueur = new Joueur({
			gui:{ 
				container: this._gui.container,
			},
			name: "joueur"
		});

		this.joueur.init()
		this.add(this.grid)
		this.add(this.axes)
		this.add(this.joueur)

	

		//this.joueur.init()

	}

	renderingComputation(dt: number) {
		this.childrenRenderingComputations(dt)
	}
}