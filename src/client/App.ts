import * as THREE from "three";
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"


export class App {
  speedFactor = 1;
  lightColor = 0xffffff;

  private constructor(
    private readonly _renderer: THREE.WebGLRenderer,
    private readonly _scene: THREE.Scene,
    private readonly _camera: THREE.PerspectiveCamera,
    private readonly _gui: GUI,
    private readonly _stats: Stats,
	  private readonly _orbitControls : OrbitControls,
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
    this._stats.update();
  }

  static create(): App {
    const renderer = new THREE.WebGLRenderer();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 800 / 600, 0.1, 100);
    const stats = Stats();
	  const orbitControls = new OrbitControls(camera , renderer.domElement)
	 

    const gui = new GUI();
    const res = new App(renderer, scene, camera, gui, stats, orbitControls);

    document.body.appendChild(renderer.domElement);
    document.body.appendChild(stats.dom);
    const appParam = gui.addFolder("App properties");
    appParam.open();

    return res;
  }
}


