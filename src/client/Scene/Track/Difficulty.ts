import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  IPropsWithGUIOptions,
  ITrackDifficultyBeatmap,
  GUIProperties,
  IGUIBooleanProperty,
  IBeatmapBlock,
  IBeatmapBomb,
  IBeatmapWall,
  BeatmapBlock,
  BeatmapBomb,
  BeatmapWall,
} from "../../Components";
import { Group } from "../../Templates";
import { ITrackLayerProps, TrackLayer } from "./Layer";

export interface ITrackDifficultyGUIProps extends GUIProperties {
  readonly visible: IGUIBooleanProperty;
}

export interface ITrackDifficultyProps
  extends IPropsWithGUIOptions<ITrackDifficultyGUIProps> {
  readonly bpm: number;
  readonly bm: ITrackDifficultyBeatmap;
  readonly visible?: boolean;
}

export class TrackDifficulty extends Group {
  private readonly _bps: number;
  private readonly _bm: ITrackDifficultyBeatmap;
  private readonly _layers: Array<TrackLayer>;
  private _timingMax: number;
  // gltfLoader: GLTFLoader

  constructor(props: ITrackDifficultyProps) {
    super({
      ...props,
      visible: props.visible ?? false,
    });
    this._bps = props.bpm / 60;
    this._bm = props.bm;
    this._timingMax = 0;
    this._obj3D.position.z = 0;
    console.log({ props });
    this._layers = this._createLayers();
    this._gui.apply(this, { visible: { type: "boolean" } });
  }

  get bm() {
    return this._bm;
  }

  private _timeToZ(t: number, offset: number = 0) {
    return t * this._bps * 4 + offset - 2;
  }

  private _createLayers(): Array<TrackLayer> {
    const layers: Array<TrackLayer> = [];
    if (this._bm.beatmap) {
      const timings: Array<number> = [];
      const layersElementsByTiming: {
        [timing: number]: Array<IBeatmapBlock | IBeatmapBomb | IBeatmapWall>;
      } = {};
      this._bm.beatmap.notes.forEach((v: IBeatmapBlock | IBeatmapBomb) => {
        if (!(v.time in layersElementsByTiming)) {
          layersElementsByTiming[v.time] = [];
          timings.push(v.time);
          if (this._timingMax < v.time) {
            this._timingMax = v.time;
          }
        }
        layersElementsByTiming[v.time].push(v);
      });
      this._bm.beatmap.obstacles.forEach((v: IBeatmapWall) => {
        if (!(v.time in layersElementsByTiming)) {
          layersElementsByTiming[v.time] = [];
          timings.push(v.time);
          if (this._timingMax < v.time) {
            this._timingMax = v.time;
          }
        }
        layersElementsByTiming[v.time].push(v);
      });
      const orderedTimings: Array<number> = timings.sort(
        (a: number, b: number) => (a > b ? 1 : a < b ? -1 : 0)
      );
      orderedTimings.forEach((t: number) => {
        const p: ITrackLayerProps = {
          name: `Layer:${t}`,
          z: -(t + this._bm.noteJumpStartBeatOffset) * 4,
          visible: true,
          walls: [],
          cubes: [],
          mines: [],
          gui: { container: this._gui.container },
        };
        for (const elt of layersElementsByTiming[t]) {
          if (elt instanceof BeatmapBlock) {
            p.cubes.push(elt);
          } else if (elt instanceof BeatmapBomb) {
			  console.log(elt)
            p.mines.push(elt);
          } else if (elt instanceof BeatmapWall) {
            p.walls.push(elt);
          }
        }
        const l = new TrackLayer(p);
        layers.push(l);
        this.add(l);
      });
    }
    return layers;
  }

  renderingComputation(t: number, dt: number, audioTime: number): void {
    if (this.visible) {
      this._obj3D.position.z = this._timeToZ(audioTime);
    }
  }
}
