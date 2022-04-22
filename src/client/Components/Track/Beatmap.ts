import {
	BeatmapBomb,
	IBeatmapBomb,
	IBeatmapBombJR
} from "./Bomb"
import {
	BeatmapBlock,
	IBeatmapBlock,
	IBeatmapBlockJR
} from "./Block"
import {
	BeatmapWall,
	IBeatmapWall,
	IBeatmapWallJR
} from "./Wall"


export interface ITrackBeatmap {
	readonly version: string
	readonly events: Array<any>
	readonly notes: Array<IBeatmapBlock | IBeatmapBomb>
	readonly obstacles: Array<IBeatmapWall>
}

export interface ITrackBeatmapJR {
	readonly _version: string
	readonly _events: Array<any>
	readonly _notes: Array<IBeatmapBlockJR | IBeatmapBombJR>
	readonly _obstacles: Array<IBeatmapWallJR>
}

export class TrackBeatmap
	implements ITrackBeatmap
{
	private constructor (
		readonly _version: string,
		readonly _events: Array<any>,
		readonly _notes: Array<IBeatmapBlock | IBeatmapBomb>,
		readonly _obstacles: Array<IBeatmapWall>
	) {}

	get version (): string { return this._version }
	get events (): Array<any> { return this._events }
	get notes (): Array<IBeatmapBlock | IBeatmapBomb> { return this._notes }
	get obstacles (): Array<IBeatmapWall> { return this._obstacles }

	static async load (
		url: string,
		difficulty: string
	): Promise<ITrackBeatmap> {
		const res = await fetch(`${url}/${difficulty}`)
		const json: ITrackBeatmapJR = await res.json()
		return TrackBeatmap.create(json)
	}

	static create (
		json: ITrackBeatmapJR
	): ITrackBeatmap {

		return new TrackBeatmap (
			json._version,
			json._events,
			json._notes.map((n: IBeatmapBlockJR | IBeatmapBombJR) => {
				return BeatmapBlock.isIt(n)
					? BeatmapBlock.create(n)
					: BeatmapBomb.create(n)
			}),
			json._obstacles.map((o: IBeatmapWallJR) => BeatmapWall.create(o))
		)
	}
}