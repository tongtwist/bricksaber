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
import Decor from "./Decor"


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
	readonly decor: Decor

	constructor(props: ISceneProps) {
		super(new THREE.Scene())
		this._textureLoader = new THREE.TextureLoader()
		this._gui = WithGUI.createAndApply(this, props)
		this.camera = new Camera({
			fov: 55,
			aspect: props.viewport.initialWidth / Math.max(props.viewport.initialHeight, 1),
			near: 0.1,
			far: 200,
		})
		this.grid = new Grid(this._gui.container)
		this.axes = new Axes(this._gui.container)
		this.decor = new Decor(this._gui.container)
		this.joueur = new Joueur({
			gui:{ 
				container: this._gui.container,
			},
			name: "joueur"
		});
		this.joueur.obj3D.position.y = 1.25
		this.joueur.init()
		this.add(
			this.grid,
			this.axes,
			this.decor,
			this.joueur
		)

		const color = 0x000000;
		const near = 10;
		const far = 150;
		this._obj3D.fog = new THREE.Fog(color, near, far);

		const guiFog = this._gui.container.addFolder("Fog");
		guiFog.add(this._obj3D.fog, "near", 0, 199);
		guiFog.add(this._obj3D.fog, "far", 0, 200);
		guiFog.addColor(this._obj3D.fog, "color");
	}

	renderingComputation(dt: number) {
		this.childrenRenderingComputations(dt)
	}
}