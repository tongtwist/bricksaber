import { WebGLRenderer } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Stats from "three/examples/jsm/libs/stats.module"
import { GUI } from "dat.gui"

import AnimationLoop from "./AnimationLoop"
import Scene from "./Scene"
import {
  IPropsWithGUIOptions,
  IWithGUI,
  WithGUI
} from "./Components"


interface IAppProps extends IPropsWithGUIOptions {
  readonly scene: Scene
  readonly animationLoop: AnimationLoop
}

export class App {
  private readonly _scene: Scene
  private readonly _animationLoop: AnimationLoop
  private readonly _gui: IWithGUI

  private constructor (props: IAppProps) {
    this._scene = props.scene
    this._animationLoop = props.animationLoop
    this._gui = WithGUI.createAndApply(this, props)
  }

  private _onWindowResize() {
    this._scene.camera.setAspect(window.innerWidth, window.innerHeight)
    this._animationLoop.renderer.setSize(window.innerWidth, window.innerHeight)
    if (!this._animationLoop.started) {
      this._animationLoop.render()
    }
  }

  run() {
    this._animationLoop.start()
  }

  static create(container: HTMLElement): App {
    const renderer = new WebGLRenderer()
    renderer.setPixelRatio(Math.min(renderer.getPixelRatio(), 2))
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.shadowMap.enabled = true

    const gui = new GUI()

    const scene = new Scene({
      name: "Scene",
      viewport: {
				initialWidth: window.innerWidth,
				initialHeight: Math.max(window.innerHeight, 1)
			},
			gui: { container: gui }
    })

    const stats = Stats()

    new OrbitControls(scene.camera.obj3D, renderer.domElement)

    const animationLoop = AnimationLoop.create(renderer, scene, gui, stats)

    const res = new App({ name: "App", scene, animationLoop, gui: { container: gui } })

    container.appendChild(renderer.domElement)
    container.appendChild(stats.dom)

    window.addEventListener("resize", res._onWindowResize.bind(res), false)

    return res
  }
}
