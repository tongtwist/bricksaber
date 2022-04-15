import * as THREE from "three"
import { GUI } from "dat.gui"


export class App {
	speedFactor = 1
	lightColor = 0xffffff

	private constructor (
		private readonly _scene: THREE.Scene,
		private readonly _gui: GUI
	) {}

	run() {
		
	}

	static create(): App {
		const scene = new THREE.Scene()

		const gui = new GUI()
		const res = new App(scene, gui)

		const appParam = gui.addFolder("App properties")
		appParam.open()
		
		return res
	}
}