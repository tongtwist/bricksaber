import * as THREE from "three";
import { IAudioPlayer } from "./AudioPlayer";

export class PositionalAudioPlayer implements IAudioPlayer {
  private _audioLoader: THREE.AudioLoader;
  private _startTime: number = 0;

  private constructor(private readonly _mediaPlayer: THREE.PositionalAudio) {
    this._audioLoader = new THREE.AudioLoader();
    this._mediaPlayer.autoplay = false;
  }

  get volume(): number {
    return this._mediaPlayer.getVolume();
  }
  set volume(v: number) {
    this._mediaPlayer.setVolume(Math.max(0, Math.min(1, v)));
  }
  get currentTime(): number {
    //   Does not take pause into account
    const currentTime = this._mediaPlayer.context.currentTime - this._startTime;
    return currentTime;
  }
  get ended() {
    // TODO FIX with .onEnded method
    return !this._mediaPlayer.isPlaying;
  }
  get playing() {
    return this._mediaPlayer.isPlaying;
  }
  get listener() {
    return this._mediaPlayer.listener;
  }
  get sound() {
    return this._mediaPlayer;
  }

  load(src: string) {
    this._audioLoader.load(src, (buffer) => {
      this._mediaPlayer.setBuffer(buffer);
      this._mediaPlayer.setLoop(false);
      this._mediaPlayer.setVolume(0.5);

      // this.play();
      // return this._mediaPlayer;
    });
  }

  setBuffer(buffer: AudioBuffer) {
    this._mediaPlayer.setBuffer(buffer);
  }

  play() {
    this._startTime = this._mediaPlayer.context.currentTime;
    this._mediaPlayer.play();
  }

  pause() {
    this._mediaPlayer.pause();
  }

  stop() {
    this._mediaPlayer.stop();
  }

  static create(): PositionalAudioPlayer {
    const listener = new THREE.AudioListener();
    const sound = new THREE.PositionalAudio(listener);
    // sound.setRefDistance(0.1);

    return new PositionalAudioPlayer(sound);
  }
}
