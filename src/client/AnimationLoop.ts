import * as THREE from "three"
import Stats from "three/examples/jsm/libs/stats.module"

import type Scene from "./Scene"
import {
	GUIContainer,
	GUIProperties,
	IGUINumberProperty,
	IPropsWithGUIOptions,
	IWithGUI,
	WithGUI
} from "./Components"


interface IAnimationLoopGUIProperties
	extends GUIProperties
{
	readonly timeAccelerator: IGUINumberProperty
}

interface IAnimationLoopProps extends IPropsWithGUIOptions<IAnimationLoopGUIProperties> {
	readonly renderer: THREE.Renderer
	readonly scene: Scene
	readonly stats: Stats
}

interface IAnimationLoopGUIProperties extends GUIProperties {
  readonly timeAccelerator: IGUINumberProperty;
}

interface IAnimationLoopProps
  extends IPropsWithGUIOptions<IAnimationLoopGUIProperties> {
  readonly renderer: THREE.Renderer;
  readonly scene: Scene;
  readonly stats: Stats;
}

export default class AnimationLoop {
  private readonly _renderer: THREE.Renderer
	private readonly _scene: Scene
	private readonly _stats: Stats
	private readonly _gui?: IWithGUI
  private readonly _clock: THREE.Clock
  private _timeAccelerator: number = 1
	private _started: boolean = false
	private _requestAnimationFrameID: number = 0
  private _oldTime: number = 0

  constructor(props: IAnimationLoopProps) {
    this._renderer = props.renderer
		this._scene = props.scene
		this._stats = props.stats
		this._gui = WithGUI.createAndApply(this, props, {
			timeAccelerator: {
				type: "number", min: 0, max: 10, step: 0.1, label: "Time Accelerator"
			}
		})
    this._clock = new THREE.Clock()
  }

  get renderer (): THREE.Renderer { return this._renderer }
	get timeAccelerator (): number { return this._timeAccelerator }
	set timeAccelerator (v: number) { this._timeAccelerator = Math.max(0, v) }
	get started () { return this._started }

  start() {
    if (!this._started) {
			this._animate(0)
			this._started = true
		}
  }

  stop() {
    if (this._started) {
			cancelAnimationFrame(this._requestAnimationFrameID),
			this._started = false
		}
  }

  render() {
		this._renderer.render(this._scene.obj3D, this._scene.camera.obj3D)
	}

  private _animate(t: number) {
    this._requestAnimationFrameID = requestAnimationFrame(this._animate.bind(this))
    const newTime = t / 1000
    const dt = (newTime - this._oldTime) * this._timeAccelerator
    this._scene.renderingComputation(dt)
    this._oldTime = newTime
    this._stats.update()
    this.render()
  }

  static create(
		renderer: THREE.WebGLRenderer,
		scene: Scene,
		gui: GUIContainer,
		stats: Stats
	): AnimationLoop {
		return new AnimationLoop({
			name: "AnimationLoop",
			renderer,
			scene,
			stats,
			gui: { container: gui }
		})
	}
}
