export interface IBeatmapBlock {
	readonly time: number
	readonly type: number			// 0 = bleu, 1 = rouge
	readonly lineIndex: number
	readonly lineLayer: number
	readonly cutDirection: number
}

export type IBeatmapBlockJR
	= { readonly [ K in keyof IBeatmapBlock as `_${K}`]: IBeatmapBlock[K] }

export class BeatmapBlock
	implements IBeatmapBlock
{
	private constructor (
		private readonly _time: number,
		private readonly _type: number,
		private readonly _lineIndex: number,
		private readonly _lineLayer: number,
		private readonly _cutDirection: number
	) {}

	get time (): number { return this._time }
	get type (): number { return this._type }
	get lineIndex (): number { return this._lineIndex }
	get lineLayer (): number { return this._lineLayer }
	get cutDirection (): number { return this._cutDirection }

	static isIt (
		json: { _type?: number, type?: number }
	): json is (IBeatmapBlock | IBeatmapBlockJR) {
		const propName: string | false
			= "type" in json
			? "type"
			: ("_type" in json ? "_type" : false)
		if ("type" in json) {
			return [0,1].includes(json.type!)
		} else if ("_type" in json) {
			return [0,1].includes(json._type!)
		}
		return false
	}

	static create (
		json: IBeatmapBlockJR
	): IBeatmapBlock {
		return new BeatmapBlock (
			json._time,
			1 - json._type,		// Doit prendre l'inverse de ce qui est enregistré pour avoir les bleus à droite et les rouges à gauche (???)
			json._lineIndex,
			json._lineLayer,
			json._cutDirection
		)
	}
}