import {
  Group,
  Object3D,
  WebGLRenderer,
  TextureLoader
} from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Stats from "three/examples/jsm/libs/stats.module"
import { GUI } from "dat.gui"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import {
  GLTF,
  GLTFLoader
} from "three/examples/jsm/loaders/GLTFLoader"

import AnimationLoop from "./Components/AnimationLoop"
import Scene from "./Scene"
import {
  IPropsWithGUIOptions,
  IWithGUI,
  WithGUI,
  IAudioPlayer,
  AudioPlayer
} from "./Components"
import PostProcessing from "./Components/PostProcessing"
import Camera from "./Scene/Camera"


interface IAppProps extends IPropsWithGUIOptions {
  readonly scene: Scene
  readonly animationLoop: AnimationLoop
  readonly gltfLoader: GLTFLoader
}

export class App {
  private readonly _scene: Scene
  private readonly _animationLoop: AnimationLoop
  private readonly _gltfLoader: GLTFLoader
  private readonly _gui: IWithGUI

  private constructor (props: IAppProps) {
    this._scene = props.scene
    this._animationLoop = props.animationLoop
    this._gltfLoader = props.gltfLoader
    this._gui = WithGUI.createAndApply(this, props)
  }

  private _onWindowResize() {
    const c: Camera | undefined = this._scene.camera
    c && c.setAspect(window.innerWidth, window.innerHeight)
    const pixelRatio: number = Math.min(window.devicePixelRatio, 2)
    const renderer: WebGLRenderer = this._animationLoop.renderer
    renderer.setPixelRatio(pixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    const composer: EffectComposer = this._animationLoop.composer
    composer.setPixelRatio(pixelRatio)
    composer.setSize(window.innerWidth, window.innerHeight)
    if (!this._animationLoop.started) {
      this._animationLoop.render()
    }
  }

  run() {
    this._animationLoop.start()
  }

  static async create(
    container: HTMLElement
  ): Promise<App> {
    const audioPlayer: IAudioPlayer = AudioPlayer.create()
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(renderer.getPixelRatio(), 2))
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.shadowMap.enabled = true
    renderer.autoClear = false

    const gui = new GUI()
    const textureLoader = new TextureLoader()
    const gltfLoader = new GLTFLoader()

    const scene = await Scene.create({
      name: "Scene",
      viewport: {
				initialWidth: window.innerWidth,
				initialHeight: Math.max(window.innerHeight, 1)
			},
      textureLoader,
      gltfLoader,
			gui: { container: gui }
    })

    const stats = Stats()

    new OrbitControls(scene.camera!.obj3D, renderer.domElement)

    const postProcessing: PostProcessing = new PostProcessing({
      name: "PostProcessing",
      renderer: renderer,
      scene: scene.obj3D,
      camera: scene.camera!.obj3D,
      gui: { container: gui }
    })

    const animationLoop = AnimationLoop.create(
      renderer,
      scene,
      gui,
      stats,
      postProcessing.composer
    )

    const res = new App({
      name: "App",
      scene,
      animationLoop,
      gltfLoader,
      gui: { container: gui }
    })

    container.appendChild(renderer.domElement)
    container.appendChild(stats.dom)

    window.addEventListener("resize", res._onWindowResize.bind(res), false)

    return res
  }
}
