import * as THREE from "three";

export default class AnimationLoop {
  private readonly _renderer: THREE.Renderer;
  private readonly _clock: THREE.Clock;
  private _reqAnim = 0;

  //   constructor(htmlElement: HTMLElement) {
  //     this._renderer = new THREE.WebGLRenderer();
  //     htmlElement.appendChild(this._renderer.domElement);
  //   }

  constructor(
    htmlElement: HTMLElement,
    private readonly _scene: THREE.Scene,
    private readonly _camera: THREE.PerspectiveCamera
  ) {
    this._renderer = new THREE.WebGLRenderer();
    this._clock = new THREE.Clock();
    htmlElement.appendChild(this._renderer.domElement);
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

    // this._scene.animate(dt);
  }
}
