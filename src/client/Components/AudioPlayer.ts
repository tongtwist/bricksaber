import * as THREE from "three";

export interface IAudioPlayer {
  //   source: string;
  volume: number;
  readonly currentTime: number;
  readonly ended: boolean;
  readonly playing: boolean;
  readonly listener: THREE.AudioListener;
  load(source: string, onLoad?: () => void): void;
  play(): void;
  pause(): void;
  stop(): void;
}

export class AudioPlayer implements IAudioPlayer {
  private _audioLoader: THREE.AudioLoader;
  private _startTime: number = 0;

  private constructor(private readonly _mediaPlayer: THREE.Audio) {
    this._audioLoader = new THREE.AudioLoader();
    this._mediaPlayer.autoplay = false;
  }

  //   get source(): string {
  //     return this._mediaPlayer.src;
  //   }
  //   set source(src: string) {
  //     this._mediaPlayer.src = src;
  //   }
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

  load(src: string) {
    return this._audioLoader.load(src, (buffer) => {
      this._mediaPlayer.setBuffer(buffer);
      this._mediaPlayer.setLoop(false);
      this._mediaPlayer.setVolume(0.5);
      this.play();
    });
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

  static create(): AudioPlayer {
    const listener = new THREE.AudioListener();
    // camera.add(listener);

    // create a global audio source
    const sound = new THREE.Audio(listener);

    return new AudioPlayer(sound);
  }
}
