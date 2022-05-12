import {
	Scene as ThreeScene,
	TextureLoader
} from "three"
import type { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import {
	WithGUI,
	IWithGUI,
	IPropsWithGUIOptions,
	IAudioPlayer,
	VR
} from "../Components"
import { SceneNode } from "../Templates"
import Camera from "./Camera"
import Axes from "./Axes"
import Grid from "./Grid"
import AmbientLight from "./AmbientLight"
import Player from "./Player"
import Decor from "./Decor"
import SceneTrack from "./Track"
import type Fog from "./Fog"


export interface ISceneProps extends IPropsWithGUIOptions {
	readonly viewport: {
		readonly initialWidth: number
		readonly initialHeight: number
	}
	readonly textureLoader: TextureLoader
	readonly gltfLoader: GLTFLoader
	readonly audioPlayer: IAudioPlayer
	readonly vr: VR
	readonly fog: Fog
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
		this._obj3D.fog = props.fog
	}

	get camera () { return this._camera }
	get audioPlayer () { return this._audioPlayer }

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

	private _enterVR () {
		if (this._player) {
			this._player.enterVR()
		}
		setTimeout(() => {
			this._audioPlayer.play(this._firstTrack?.bmTrack.songUrl)
		}, 2000)
	}

	private _leaveVR () {
		if (this._player) {
			this._player.leaveVR()
		}
		this._audioPlayer.stop()
	}

	renderingComputation(
		t: number,
		dt: number,
		audioTime: number
	) {
		this.childrenRenderingComputations(t, dt, audioTime)
	}

	static async create (
		props: ISceneProps
	): Promise<Scene> {
		const result: Scene = new Scene(props)
		props.vr.onVRStarted = result._enterVR.bind(result)
		props.vr.onVREnded = result._leaveVR.bind(result)
		const [ camera, ambientLight, grid, axes, player, decor, firstTrack ] = await Promise.all([
			Camera.create({
				fov: 55,
				aspect: props.viewport.initialWidth / Math.max(props.viewport.initialHeight, 1),
				near: 0.1,
				far: 200
			}),
			AmbientLight.create(result._gui.container),
			Grid.create(result._gui.container),
			Axes.create(result._gui.container),
			Player.create({
				parentGUIContainer: result._gui.container,
				gltfLoader: props.gltfLoader,
				vr: props.vr
			}),
			Decor.create(result._gui.container, props.gltfLoader),
			SceneTrack.create("1", result._gui.container, props.gltfLoader)
		])
		result._setChildren({ camera, ambientLight, grid, axes, player, decor, firstTrack })
		/*setTimeout(
			() => result._audioPlayer.play(firstTrack.bmTrack.songUrl),
			5000
		)*/
		return result
	}
}
