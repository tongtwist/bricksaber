import {
	Scene as ThreeScene,
	Fog,
	TextureLoader
} from "three"
import type { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import {
	WithGUI,
	IWithGUI,
	IPropsWithGUIOptions,
	IAudioPlayer
} from "../Components"
import { SceneNode } from "../Templates"
import Camera from "./Camera"
import Axes from "./Axes"
import Grid from "./Grid"
import AmbientLight from "./AmbientLight"
import Player from "./Player"
import Decor from "./Decor"
import SceneTrack from "./Track"


export interface ISceneProps extends IPropsWithGUIOptions {
	readonly viewport: {
		readonly initialWidth: number
		readonly initialHeight: number
	}
	readonly textureLoader: TextureLoader
	readonly gltfLoader: GLTFLoader
	readonly audioPlayer: IAudioPlayer
}

interface ISceneChildren {
	camera: Camera
	ambientLight: AmbientLight
	grid: Grid
	axes: Axes
	decor: Decor
	player: Player
	firstTrack: SceneTrack
}

export default class Scene extends SceneNode<ThreeScene> {
	private readonly _gui: IWithGUI
	private readonly _audioPlayer: IAudioPlayer
	private _camera?: Camera
	private _ambientLight?: AmbientLight
	private _grid?: Grid
	private _axes?: Axes
	private _player?: Player
	private _decor?: Decor
	private _firstTrack?: SceneTrack

	private constructor(
		props: ISceneProps
	) {
		super(new ThreeScene())
		this._gui = WithGUI.createAndApply(this, props)
		this._audioPlayer = props.audioPlayer

		// TODO: Fog creation. Have to redefine as a Scene child
		const color = 0x000000
		const near = 25
		const far = 60
		this._obj3D.fog = new Fog(color, near, far)
		const guiFog = this._gui.container.addFolder("Fog")
		guiFog.add(this._obj3D.fog, "near", 0, 199)
		guiFog.add(this._obj3D.fog, "far", 0, 200)
		guiFog.addColor(this._obj3D.fog, "color")
	}

	get camera () { return this._camera }
	get audioPlayer () { return this._audioPlayer }

	renderingComputation(
		t: number,
		dt: number,
		audioTime: number
	) {
		this.childrenRenderingComputations(t, dt, audioTime)
	}

	private _setChildren(children: ISceneChildren) {
		if (typeof this._camera === "undefined") {
			this._camera = children.camera
			this._ambientLight = children.ambientLight
			this._grid = children.grid
			this._axes = children.axes
			this._player = children.player
			this._decor = children.decor
			this._firstTrack = children.firstTrack
			this.add(
				this._camera,
				this._ambientLight,
				this._grid,
				this._axes,
				this._decor,
				this._player,
				this._firstTrack
			)
		}
	}

	static async create (
		props: ISceneProps
	): Promise<Scene> {
		const result: Scene = new Scene(props)
		const [ camera, ambientLight, grid, axes, player, decor, firstTrack ] = await Promise.all([
			Camera.create({
				fov: 55,
				aspect: props.viewport.initialWidth / Math.max(props.viewport.initialHeight, 1),
				near: 0.1,
				far: 200,
			}),
			AmbientLight.create(result._gui.container),
			Grid.create(result._gui.container),
			Axes.create(result._gui.container),
			Player.create(result._gui.container, props.gltfLoader),
			Decor.create(result._gui.container, props.gltfLoader),
			SceneTrack.create("1", result._gui.container)
		])
		result._setChildren({ camera, ambientLight, grid, axes, player, decor, firstTrack })
		result._player!.obj3D.position.y = 1.25
		console.log(firstTrack)
		result._audioPlayer.play(firstTrack.bmTrack.songUrl)
		return result
	}
}
