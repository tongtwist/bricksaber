import { Track } from ".";
import Lane from "../../Scene/Lane";
import { Bomb, Cube, Grid, LaneGrid, SceneNode } from "../../Templates";
import { IBeatmapBlock } from "./Block";
import { IBeatmapBomb } from "./Bomb";
import { ITrackDifficultyBeatmap } from "./DifficultyBeatmap";
import { IBeatmapWall } from "./Wall";

type LaneGridWrapper = {
  time: number;
  laneGrid: LaneGrid;
};

export default class BeatmapLoader {
  private _laneGrids: LaneGridWrapper[] = [];
  private _bpm: number = 0;
  private _beatmapSet: ITrackDifficultyBeatmap = {
    difficulty: "",
    difficultyRank: 0,
    beatmapFilename: "",
    noteJumpMovementSpeed: 0,
    noteJumpStartBeatOffset: 0,
    load: function (url: string): Promise<void> {
      throw new Error("Function not implemented.");
    },
  };

  async load(url: string, difficulty: string) {
    const res = await Track.load(url);
    this._bpm = res.beatsPerMinute;
    this._beatmapSet = res.difficultyBeatmapSets["Expert"]!;

    return this;
  }

  getBpm() {
    return this._bpm;
  }

  getLaneGrids() {
    // const laneGrids: laneGridItem[] = [];
    console.log(this._beatmapSet.beatmap);

    this._beatmapSet.beatmap?.notes.forEach((note) => {
      const time = note.time;
      const laneGrid = this.getLaneGridFromTime(time);
      let object = null;

      if (note.type === 3) {
        object = new Bomb();
      } else {
        object = new Cube({ type: note.type === 0 ? "Blue" : "Red" });
      }

      laneGrid.addToCell(object, note.lineIndex, note.lineLayer);

      if (!this.doesLaneGridAlreadyExist(time)) {
        laneGrid.obj3D.position.z = (-time * this._bpm) / 60;
        this._laneGrids.push({ time, laneGrid });
      }
    });

    this._beatmapSet.beatmap?.obstacles.forEach((obstacle) => {});

    return this._laneGrids;
  }

  private doesLaneGridAlreadyExist(time: number) {
    const index = this._laneGrids.findIndex((grid) => grid.time === time);
    return index !== -1;
  }

  private getLaneGridFromTime(time: number) {
    const laneGridWrapper = this._laneGrids.find((grid) => grid.time === time);
    if (laneGridWrapper) {
      return laneGridWrapper.laneGrid;
    }

    return new LaneGrid(this._bpm);
  }
}
