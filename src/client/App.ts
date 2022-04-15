import * as THREE from "three"
import { GUI } from "dat.gui"


export class App {
	speedFactor = 1
	lightColor = 0xffffff

	private constructor (
		private readonly _renderer: THREE.WebGLRenderer,
		private readonly _scene: THREE.Scene,
		private readonly _camera: THREE.PerspectiveCamera,
		private readonly _gui: GUI
	) {}

	run() {
		this.frameAnimation(0)
	}

	render () {
		this._renderer.render(this._scene, this._camera)
	}

	frameAnimation (t: number) {
		requestAnimationFrame(this.frameAnimation.bind(this))
		this.render()
	}

	static create(): App {
		const renderer = new THREE.WebGLRenderer()
		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(55, 800 / 600, 0.1, 100)

		const gui = new GUI()
		const res = new App(renderer, scene, camera, gui)

		const appParam = gui.addFolder("App properties")
		appParam.open()
		
		return res
	}
}