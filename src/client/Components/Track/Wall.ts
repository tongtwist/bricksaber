export interface IBeatmapWall {
	readonly time: number
	readonly type: number		// 0 = mur vertical, 1 = mur horizontal
	readonly duration: number
	readonly lineIndex: number
	readonly width: number
}

export type IBeatmapWallJR
	= { readonly [ K in keyof IBeatmapWall as `_${K}`]: IBeatmapWall[K] }

export class BeatmapWall
	implements IBeatmapWall
{
	private constructor (
		private readonly _time: number,
		private readonly _type: number,
		private readonly _duration: number,
		private readonly _lineIndex: number,
		private readonly _width: number
	) {}

	get time (): number { return this._time }
	get type (): number { return this._type }
	get duration (): number { return this._duration }
	get lineIndex (): number { return this._lineIndex }
	get width (): number { return this._width }

	static create (
		json: IBeatmapWallJR
	): IBeatmapWall {
		return new BeatmapWall(
			json._time,
			json._type,
			json._duration,
			json._lineIndex,
			json._width
		)
	}
}