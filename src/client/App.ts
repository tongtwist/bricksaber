import * as THREE from "three";
import { GUI } from "dat.gui";
import AnimationLoop from "./AnimationLoop";

export class App {
  speedFactor = 1;
  lightColor = 0xffffff;

  private constructor(
    private readonly _scene: THREE.Scene,
    private readonly _camera: THREE.PerspectiveCamera,
    private readonly _gui: GUI
  ) {}

  run() {
    const animationLoop = new AnimationLoop(document.body, this._scene, this._camera);
    animationLoop.start();

	// setTimeout(() => {
	// 	animationLoop.stop()
	// }, 3000);
  }

  static create(): App {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 800 / 600, 0.1, 100);

    const gui = new GUI();
    const res = new App(scene, camera, gui);

    const appParam = gui.addFolder("App properties");
    appParam.open();

    return res;
  }
}
