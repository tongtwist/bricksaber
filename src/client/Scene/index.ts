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
	Track,
	IBeatmapBlock,
	IBeatmapBomb,
	IBeatmapWall,
	IAudioPlayer
} from "../Components"
import {
	SceneNode,
	Bomb,
	Cube,
	LaneGrid
} from "../Templates"
import Camera from "./Camera"
import Axes from "./Axes"
import Grid from "./Grid"
import AmbientLight from "./AmbientLight"
import Player from "./Player"
import Decor from "./Decor"
import Lane from "./Lane"
import BeatmapLoader from "../Components/Track/BeatmapLoader"


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
	lane: Lane
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
	private _lane?: Lane

	private constructor(
		props: ISceneProps
	) {
		super(new ThreeScene())
		this._gui = WithGUI.createAndApply(this, props)
		this._audioPlayer = props.audioPlayer

		/**
		 * Fog creation. Redefine as a Scene child
		 */
		const color = 0x000000
		const near = 10
		const far = 150
		this._obj3D.fog = new Fog(color, near, far)
		const guiFog = this._gui.container.addFolder("Fog")
		guiFog.add(this._obj3D.fog, "near", 0, 199)
		guiFog.add(this._obj3D.fog, "far", 0, 200)
		guiFog.addColor(this._obj3D.fog, "color")
	}

	get camera () { return this._camera }

	renderingComputation(dt: number) {
		this.childrenRenderingComputations(dt)
	}

	async load(url: string) {
		const loader = new BeatmapLoader()
		await loader.load(url, "Expert")
		const laneGrids = loader.getLaneGrids()
		// BeatmapLoader.loadIntoLane(url, this.lane)
		this._lane = new Lane(
			this._gui.container,
			loader.getBpm(),
			this._audioPlayer
		)

		laneGrids.forEach((laneGridWrapper) => {
			this._lane!.add(laneGridWrapper.laneGrid)
		})

		this.add(this._lane)
	}

	async loadLane (url: string): Promise<Lane> {
		const loader = new BeatmapLoader()
		await loader.load(url, "Expert")
		const laneGrids = loader.getLaneGrids()
		// BeatmapLoader.loadIntoLane(url, this.lane)
		const result = new Lane(
			this._gui.container,
			loader.getBpm(),
			this._audioPlayer
		)
		laneGrids.forEach((laneGridWrapper) => {
			this._lane!.add(laneGridWrapper.laneGrid)
		})
		return result
	}

	private _setChildren(children: ISceneChildren) {
		if (typeof this._camera === "undefined") {
			this._camera = children.camera
			this._ambientLight = children.ambientLight
			this._grid = children.grid
			this._axes = children.axes
			this._player = children.player
			this._decor = children.decor
			this._lane = children.lane
			this.add(
				this._camera,
				this._ambientLight,
				this._grid,
				this._axes,
				this._decor,
				this._player,
				this._lane
			)
		}
	}

	static async create (
		props: ISceneProps
	): Promise<Scene> {
		const result: Scene = new Scene(props)
		const [ camera, ambientLight, grid, axes, player, decor, lane ] = await Promise.all([
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
			result.loadLane("/tracks/1")
		])
		result._setChildren({ camera, ambientLight, grid, axes, player, decor, lane })
		result._player!.obj3D.position.y = 1.25
		return result
	}
}
