import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import Scene from "./scene/Scene";

export default class AnimationLoop {
  private readonly _clock: THREE.Clock;
  private _reqAnim = 0;

  constructor(
    private readonly _renderer: THREE.Renderer,
    private readonly _stats: Stats,
    private readonly _scene: Scene,
    private readonly _camera: THREE.PerspectiveCamera
  ) {
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
    this._renderer.render(this._scene.threeObject, this._camera);
  }

  private _animate() {
    this._reqAnim = requestAnimationFrame(this._animate.bind(this));
    this._render();

    const dt = this._clock.getDelta();

    this._scene.renderComputation(dt);
    this._stats.update();
  }
}
