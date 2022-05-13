import {
  GUIContainer,
  IPropsWithGUIOptions,
  Track as BMTrack,
  ITrack as IBMTrack,
  GUIProperties,
  IGUIBooleanProperty,
} from "../../Components";
import { Group } from "../../Templates";
import { ITrackDifficultyProps, TrackDifficulty } from "./Difficulty";

export interface ITrackGUIProps extends GUIProperties {
  readonly visible: IGUIBooleanProperty;
}

export interface ITrackProps extends IPropsWithGUIOptions<ITrackGUIProps> {
  readonly bmTrack: IBMTrack;
  readonly visible?: boolean;
}

export default class Track extends Group {
  private readonly _bmTrack: IBMTrack;
  private readonly _difficulties: { [k: string]: TrackDifficulty };

  private constructor(props: ITrackProps) {
    super({
      ...props,
      visible: props.visible ?? false,
    });
    this._bmTrack = props.bmTrack;
    this._difficulties = {};
    this._obj3D.scale.y = 0.8;
    this._obj3D.position.y = -0.5;
    this._gui.apply(this, { visible: { type: "boolean" } });
  }

  get bmTrack() {
    return this._bmTrack;
  }
  get difficulties() {
    return this._difficulties;
  }

  static async create(
    trackName: string,
    parentGUIContainer: GUIContainer
  ): Promise<Track> {
    const bmTrack = await BMTrack.load(trackName);
    const result = new Track({
      name: `Track ${trackName}`,
      bmTrack,
      visible: true,
      gui: { container: parentGUIContainer },
    });
    for (const difficulty in bmTrack.difficultyBeatmapSets) {
      const bm = bmTrack.difficultyBeatmapSets[difficulty];
      const difficultyProps: ITrackDifficultyProps = {
        name: difficulty,
        bm,
        bpm: bmTrack.beatsPerMinute,
        visible: difficulty === "Expert",
        gui: { container: result._gui.container },
      };
      const d = new TrackDifficulty(difficultyProps);
      result._difficulties[difficulty] = d;
      result.add(d);
    }
    return result;
  }
}
