import * as THREE from "three"
import Stats from "three/examples/jsm/libs/stats.module"

import type Scene from "../Scene"
import {
	GUIContainer,
	GUIProperties,
	IGUINumberProperty,
	IPropsWithGUIOptions,
	IWithGUI,
	WithGUI,
	IAudioPlayer
} from "."
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { WebGLRenderer } from "three"
import Camera from "../Scene/Camera"


interface IAnimationLoopGUIProperties extends GUIProperties {
	readonly timeAccelerator: IGUINumberProperty
}

interface IAnimationLoopProps extends IPropsWithGUIOptions<IAnimationLoopGUIProperties> {
	readonly renderer: WebGLRenderer
	readonly scene: Scene
	readonly stats: Stats
	readonly composer: EffectComposer
}

export default class AnimationLoop {
	private readonly _renderer: WebGLRenderer
	private readonly _scene: Scene
	private readonly _audioPlayer: IAudioPlayer
	private readonly _stats: Stats
	private readonly _gui?: IWithGUI
	private readonly _composer: EffectComposer
	private readonly _clock: THREE.Clock
	private _timeAccelerator: number = 1
	private _started: boolean = false
	private _requestAnimationFrameID: number = 0
	private _oldTime: number = 0
	private _oldAudioTime: number = 0

	constructor(props: IAnimationLoopProps) {
		this._renderer = props.renderer
		this._scene = props.scene
		this._audioPlayer = this._scene.audioPlayer
		this._stats = props.stats
		this._gui = WithGUI.createAndApply(this, props, {
			timeAccelerator: {
				type: "number", min: 0, max: 10, step: 0.1, label: "Time Accelerator"
			}
		})
		this._clock = new THREE.Clock()
		this._composer = props.composer;
	}

	get renderer(): THREE.WebGLRenderer { return this._renderer }
	get composer(): EffectComposer { return this._composer }
	get timeAccelerator(): number { return this._timeAccelerator }
	set timeAccelerator(v: number) { this._timeAccelerator = Math.max(0, v) }
	get started() { return this._started }

	start() {
		if (!this._started) {
			this._renderer.clear()
			this._animate()
			this._started = true
		}
	}

	stop() {
		if (this._started) {
			cancelAnimationFrame(this._requestAnimationFrameID)
			this._started = false
		}
	}

	render() {
		const c: Camera | undefined = this._scene.camera
		if (c) {
			c.obj3D.layers.set(1)
			this._composer.render()
			this._renderer.clearDepth()
			c.obj3D.layers.set(0)
			this._renderer.render(this._scene.obj3D, c.obj3D)
		}
	}

	private _animate() {
		this._requestAnimationFrameID = requestAnimationFrame(this._animate.bind(this))
		const newTime = this._clock.getElapsedTime()
		const dt = (newTime - this._oldTime) * this._timeAccelerator
		this._oldTime = newTime
		let audioTime = this._audioPlayer.currentTime
		if (audioTime === this._oldTime) {
			audioTime += dt
		} else {
			this._oldAudioTime = audioTime
		}
		this._scene.renderingComputation(newTime, dt, audioTime)
		this._stats.update()
		this.render()
	}

	static create(
		renderer: THREE.WebGLRenderer,
		scene: Scene,
		gui: GUIContainer,
		stats: Stats,
		composer: EffectComposer
	): AnimationLoop {
		return new AnimationLoop({
			name: "AnimationLoop",
			renderer,
			scene,
			stats,
			gui: { container: gui },
			composer,
		})
	}
}
