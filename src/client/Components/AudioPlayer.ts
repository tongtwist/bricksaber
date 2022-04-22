export interface IAudioPlayer {
	source: string
	volume: number
	readonly currentTime: number
	play (source?: string): void
	pause (): void
	stop (): void
}


export class AudioPlayer
	implements IAudioPlayer
{
	private constructor (
		private readonly _mediaPlayer: HTMLAudioElement
	) {}

	get source (): string { return this._mediaPlayer.src }
	set source (src: string) { this._mediaPlayer.src = src }
	get volume (): number { return this._mediaPlayer.volume }
	set volume (v: number) { this._mediaPlayer.volume = Math.max(0, Math.min(1, v)) }
	get currentTime (): number { return this._mediaPlayer.currentTime }

	play (src?: string) {
		if (src) {
			this.source = src
		}
		this._mediaPlayer.play()
	}

	pause () {
		this._mediaPlayer.pause()
	}

	stop () {
		this._mediaPlayer.load()
	}

	static create (): AudioPlayer {
		return new AudioPlayer(
			new Audio()
		)
	}
}