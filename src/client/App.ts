import * as THREE from "three";
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import AnimationLoop from "./AnimationLoop";
import Scene from "./scene/Scene";
import Cube from "./objects/Cube";

export class App {
  speedFactor = 1;
  lightColor = 0xffffff;
  private _width: number = 0;
  private _heigth: number = 0;
  private _canvaRatio: number = 0;

  private constructor(
    private readonly _renderer: THREE.Renderer,
    private readonly _scene: THREE.Scene,
    private readonly _camera: THREE.PerspectiveCamera,
    private readonly _gui: GUI,
    private readonly _stats: Stats,
    private readonly _orbitControls: OrbitControls,
  ) {}

  get width(): number {
    return this._width;
  }

  set width(newValue: number) {
    this._width = Math.max(newValue, 0);
  }

  get heigth(): number {
    return this._heigth;
  }

  set heigth(newValue: number) {
    this._heigth = Math.max(newValue, 1);
  }

  get canvaRatio(): number {
    return this._canvaRatio;
  }

  set canvaRatio(newValue: number) {
    this._canvaRatio = newValue;
  }

  run() {
    const animationLoop = new AnimationLoop(
      this._renderer,
      this._stats,
      this._scene,
      this._camera
    );
    animationLoop.start();

    // setTimeout(() => {
    // 	animationLoop.stop()
    // }, 3000);
  }

  static create(): App {
    const scene = new Scene();
    const cube = new Cube();
    scene.add(cube);

    // const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, App._ratio(), 0.1, 100);
    const renderer = new THREE.WebGLRenderer();
    const gui = new GUI();
    const stats = Stats();
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    const res = new App(
      renderer,
      scene.threeObject as THREE.Scene,
      camera,
      gui,
      stats,
      orbitControls
    );
    res.onWindowResize();
    const appParam = gui.addFolder("App properties");
    appParam.open();

    window.addEventListener("resize", res.onWindowResize.bind(res));
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(stats.dom);

    return res;
  }

  private onWindowResize() {
    this._camera.aspect = App._ratio(this);
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(this.width, this.heigth);
    this._renderer.render(this._scene, this._camera);
  }

  private static _ratio(app?: App): number {
    const [w, h] = [window.innerWidth, window.innerHeight];
    const ratio = w / h;
    if (app) {
      app.width = w;
      app.heigth = h;
      app.canvaRatio = ratio;
    }
    return ratio;
  }
}
