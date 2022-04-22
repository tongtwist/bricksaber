import {
  ITrackBeatmapJR,
  ITrackBeatmap,
  TrackBeatmap
} from "./Beatmap"

export interface ITrackDifficultyBeatmap {
  readonly difficulty: string
  readonly difficultyRank: number
  readonly beatmapFilename: string
  readonly noteJumpMovementSpeed: number
  readonly noteJumpStartBeatOffset: number
  beatmap?: ITrackBeatmap
  load (url: string): Promise<void>
}

export type ITrackDifficultyBeatmapJR
  = { readonly [ K in keyof Omit<ITrackDifficultyBeatmap, "beatmap"> as `_${K}`]: ITrackDifficultyBeatmap[K] }

export class TrackDifficultyBeatmap
  implements ITrackDifficultyBeatmap
{
  private _beatmap?: ITrackBeatmap

  private constructor (
    readonly _difficulty: string,
    readonly _difficultyRank: number,
    readonly _beatmapFilename: string,
    readonly _noteJumpMovementSpeed: number,
    readonly _noteJumpStartBeatOffset: number
  ) {}

  get difficulty (): string { return this._difficulty }
  get difficultyRank (): number { return this._difficultyRank }
  get beatmapFilename (): string { return this._beatmapFilename }
  get noteJumpMovementSpeed (): number { return this._noteJumpMovementSpeed}
  get noteJumpStartBeatOffset () : number { return this._noteJumpStartBeatOffset }
  get beatmap (): ITrackBeatmap | undefined { return this._beatmap }

  async load (
    url: string
  ): Promise<void> {
    const res = await fetch(`${url}/${this._beatmapFilename}`)
		const json: ITrackBeatmapJR = await res.json()
		this._beatmap = TrackBeatmap.create(json)
  }

  static create(
    json: ITrackDifficultyBeatmapJR
  ): ITrackDifficultyBeatmap {
    return new TrackDifficultyBeatmap(
      json._difficulty,
      json._difficultyRank,
      json._beatmapFilename,
      json._noteJumpMovementSpeed,
      json._noteJumpStartBeatOffset
    )
  }
}