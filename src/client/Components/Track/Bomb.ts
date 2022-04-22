export interface IBeatmapBomb {
	readonly time: number
	readonly type: number
	readonly lineIndex: number
	readonly lineLayer: number
}

export type IBeatmapBombJR
	= { readonly [ K in keyof IBeatmapBomb as `_${K}`]: IBeatmapBomb[K] }

export class BeatmapBomb
	implements IBeatmapBomb
{
	private constructor (
		private readonly _time: number,
		private readonly _type: number,
		private readonly _lineIndex: number,
		private readonly _lineLayer: number
	) {}

	get time (): number { return this._time }
	get type (): number { return this._type }
	get lineIndex (): number { return this._lineIndex }
	get lineLayer (): number { return this._lineLayer }

	static create (
		json: IBeatmapBombJR
	): IBeatmapBomb {
		return new BeatmapBomb(
			json._time,
			json._type,
			json._lineIndex,
			json._lineLayer
		)
	}
}