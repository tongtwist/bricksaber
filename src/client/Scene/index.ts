import * as THREE from "three";

import {
  WithGUI,
  IWithGUI,
  IPropsWithGUIOptions,
  Track,
  IBeatmapBlock,
  IBeatmapBomb,
  IBeatmapWall,
  IAudioPlayer,
} from "../Components";
import { Bomb, Cube, LaneGrid, SceneNode } from "../Templates";
import Camera from "./Camera";
import Axes from "./Axes";
import Grid from "./Grid";
import Lane from "./Lane";
import BeatmapLoader from "../Components/Track/BeatmapLoader";
// import { Light } from "./Light"

export interface ISceneProps extends IPropsWithGUIOptions {
  readonly viewport: {
    readonly initialWidth: number;
    readonly initialHeight: number;
  };
  audioPlayer: IAudioPlayer;
}

export default class Scene extends SceneNode<THREE.Scene> {
  private readonly _textureLoader: THREE.TextureLoader;
  private readonly _gui: IWithGUI;
  private readonly _audioPlayer: IAudioPlayer;

  readonly camera: Camera;
  readonly grid: Grid;
  readonly axes: Axes;
  private _lane?: Lane;

  constructor(props: ISceneProps) {
    super(new THREE.Scene());
    this._textureLoader = new THREE.TextureLoader();
    this._gui = WithGUI.createAndApply(this, props);
    this._audioPlayer = props.audioPlayer;
    this.camera = new Camera({
      fov: 55,
      aspect:
        props.viewport.initialWidth / Math.max(props.viewport.initialHeight, 1),
      near: 0.1,
      far: 100,
    });
    this.grid = new Grid(this._gui.container);
    this.axes = new Axes(this._gui.container);
    this.add(this.grid);
    this.add(this.axes);
  }

  async load(url: string) {
    const loader = new BeatmapLoader();
    await loader.load(url, "Expert");
    const laneGrids = loader.getLaneGrids();
    // BeatmapLoader.loadIntoLane(url, this.lane);
    this._lane = new Lane(
      this._gui.container,
      loader.getBpm(),
      this._audioPlayer
    );

    laneGrids.forEach((laneGridWrapper) => {
      this._lane!.add(laneGridWrapper.laneGrid);
    });

    this.add(this._lane);
  }

  renderingComputation(dt: number) {
    this.childrenRenderingComputations(dt);
  }
}
