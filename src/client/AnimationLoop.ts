import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";

export default class AnimationLoop {
  private readonly _clock: THREE.Clock;
  private _reqAnim = 0;

  //   constructor(htmlElement: HTMLElement) {
  //     this._renderer = new THREE.WebGLRenderer();
  //     htmlElement.appendChild(this._renderer.domElement);
  //   }

  constructor(
    private readonly _renderer: THREE.Renderer,
    private readonly _stats: Stats,
    private readonly _scene: THREE.Scene,
    private readonly _camera: THREE.PerspectiveCamera
  ) {
    this._renderer = new THREE.WebGLRenderer();
    this._clock = new THREE.Clock();
  }

  start() {
    this._clock.start();
    this._animate();
  }

  stop() {
    this._clock.stop();
    cancelAnimationFrame(this._reqAnim);
  }

  private _render() {
    this._renderer.render(this._scene, this._camera);
  }

  private _animate() {
    this._reqAnim = requestAnimationFrame(this._animate.bind(this));
    this._render();

    const dt = this._clock.getDelta();
    // console.log(dt);

    // this._scene.animate(dt);
    this._stats.update();
  }
}
