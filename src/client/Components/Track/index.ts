import {
	ITrackDifficultyBeatmap,
	ITrackDifficultyBeatmapJR,
	TrackDifficultyBeatmap
} from "./DifficultyBeatmap"


export interface ITrack {
	readonly version: string
	readonly songName: string
	readonly beatsPerMinute: number
	readonly songTimeOffset: number
	readonly songFilename: string
	readonly songUrl: string
	readonly coverImageFilename: string
	readonly difficultyBeatmapSets: { [difficulty: string]: ITrackDifficultyBeatmap }
	loadBeatmaps (url: string): Promise<void>
}

export type ITrackJRBase
	= { readonly [ K in keyof Omit<ITrack, "loadBeatMaps"> as `_${K}` ]: ITrack[K] }

export interface ITrackJR
	extends Omit<ITrackJRBase, "_difficultyBeatmapSets">
{
	readonly _difficultyBeatmapSets: Array<{
		readonly _beatmapCharacteristicName: string
		readonly _difficultyBeatmaps: Array<ITrackDifficultyBeatmapJR>
	}>
}

export class Track
	implements ITrack
{
	constructor (
		private readonly _baseURL: string,
		private readonly _version: string,
		private readonly _songName: string,
		private readonly _beatsPerMinute: number,
		private readonly _songTimeOffset: number,
		private readonly _songFilename: string,
		private readonly _coverImageFilename: string,
		private readonly _difficultyBeatmapSets: { readonly [difficulty: string]: ITrackDifficultyBeatmap }
	) {}

	get baseURL () { return this._baseURL }
	get version () { return this._version }
	get songName () { return this._songName }
	get beatsPerMinute () { return this._beatsPerMinute }
	get songTimeOffset () { return this._songTimeOffset }
	get songFilename () { return this._songFilename }
	get songUrl () { return `${this._baseURL}${this._songFilename}` }
	get coverImageFilename () { return this._coverImageFilename }
	get difficultyBeatmapSets () { return this._difficultyBeatmapSets}

	async loadBeatmaps(url: string): Promise<void> {
		for (const difficultyName in this._difficultyBeatmapSets) {
			await this._difficultyBeatmapSets[difficultyName].load(url)
		}
	}

	static create (
		baseUrl: string,
		json: ITrackJR
	): ITrack {
		const difficultyBeatmapSets: { [difficulty: string]: ITrackDifficultyBeatmap } = {}
		const j: ITrackJR["_difficultyBeatmapSets"] = json._difficultyBeatmapSets
		if (j.length > 0) {
			const a: Array<ITrackDifficultyBeatmapJR> = j[0]._difficultyBeatmaps
			a.forEach((bmjr: ITrackDifficultyBeatmapJR) => {
				difficultyBeatmapSets[bmjr._difficulty] = TrackDifficultyBeatmap.create(bmjr)
			})
		}
		return new Track(
			baseUrl,
			json._version,
			json._songName,
			json._beatsPerMinute,
			json._songTimeOffset,
			json._songFilename,
			json._coverImageFilename,
			difficultyBeatmapSets
		)
	}

	static async load(
		name: string
	): Promise<ITrack> {
		const baseUrl = `/tracks/${name}/`
		const res = await fetch(`${baseUrl}Info.json`)
		const json: ITrackJR = await res.json()
		const result: ITrack = Track.create(baseUrl, json)
		await result.loadBeatmaps(baseUrl)
		return result
	}
}


export * from "./Beatmap"
export * from "./DifficultyBeatmap"
export * from "./Block"
export * from "./Bomb"
export * from "./Wall"
