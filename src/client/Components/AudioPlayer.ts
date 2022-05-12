export interface IAudioPlayer {
	source: string
	volume: number
	readonly currentTime: number
	readonly ended: boolean
	readonly playing: boolean
	play (source?: string): void
	pause (): void
	stop (): void
}


export class AudioPlayer
	implements IAudioPlayer
{
	private _playing: boolean
	
	private constructor (
		private readonly _mediaPlayer: HTMLAudioElement
	) {
		this._mediaPlayer.autoplay = false
		this._playing = false
		this._mediaPlayer.addEventListener("ended", () => this._playing = false)
		this._mediaPlayer.addEventListener("playing", () => this._playing = true)
	}

	get source (): string { return this._mediaPlayer.src }
	set source (src: string) { this._mediaPlayer.src = src }
	get volume (): number { return this._mediaPlayer.volume }
	set volume (v: number) { this._mediaPlayer.volume = Math.max(0, Math.min(1, v)) }
	get currentTime (): number { return this._mediaPlayer.currentTime }
	get ended () { return this._mediaPlayer.ended }
	get playing () { return this._playing }

	play (src?: string) {
		if (src) {
			this.source = src
		}
		this._mediaPlayer.play()

	}

	pause () {
		this._mediaPlayer.pause()
		this._playing = false
	}

	stop () {
		this._mediaPlayer.load()
		this._playing = false
	}

	static create (): AudioPlayer {
		return new AudioPlayer(
			new Audio()
		)
	}
}