import * as THREE from "three";
import { GUI } from "dat.gui";

export class App {
  speedFactor = 1;
  lightColor = 0xffffff;
  width = window.innerWidth;
  heigth = Math.max(window.innerHeight, 1);

  private constructor(
    private readonly _renderer: THREE.WebGLRenderer,
    private readonly _scene: THREE.Scene,
    private readonly _camera: THREE.PerspectiveCamera,
    private readonly _gui: GUI
  ) {}

  run() {
    this.frameAnimation(0);
  }

  render() {
    this._renderer.render(this._scene, this._camera);
  }

  frameAnimation(t: number) {
    requestAnimationFrame(this.frameAnimation.bind(this));
    this.render();
  }

  create(): App {
    const renderer = new THREE.WebGLRenderer();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, this._ratio(), 0.1, 100);

    const gui = new GUI();
    const res = new App(renderer, scene, camera, gui);

    document.body.appendChild(renderer.domElement);

    const appParam = gui.addFolder("App properties");
    appParam.open();

    return res;
  }

  private onWindowResize() {
    this._camera.aspect = this._ratio();
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(this.width, this.heigth);
  }

  private _ratio() {
    return this.width / this.heigth;
  }
}