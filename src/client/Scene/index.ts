import { Scene as ThreeScene, TextureLoader } from "three";
import type { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import {
  WithGUI,
  IWithGUI,
  IPropsWithGUIOptions,
  IAudioPlayer,
  VR,
} from "../Components";
import { SceneNode } from "../Templates";
import Camera from "./Camera";
import Axes from "./Axes";
import Grid from "./Grid";
import AmbientLight from "./AmbientLight";
import Player from "./Player";
import Decor from "./Decor";
import SceneTrack from "./Track";
import type Fog from "./Fog";

export interface ISceneProps extends IPropsWithGUIOptions {
  readonly viewport: {
    readonly initialWidth: number;
    readonly initialHeight: number;
  };
  readonly textureLoader: TextureLoader;
  readonly gltfLoader: GLTFLoader;
  readonly audioPlayer: IAudioPlayer;
  readonly vr: VR;
  readonly fog: Fog;
}

interface ISceneChildren {
  camera: Camera;
  ambientLight: AmbientLight;
  grid: Grid;
  axes: Axes;
  decor: Decor;
  player: Player;
  firstTrack: SceneTrack;
}

export default class Scene extends SceneNode<ThreeScene> {
  private readonly _gui: IWithGUI;
  private readonly _audioPlayer: IAudioPlayer;
  private _camera?: Camera;
  private _ambientLight?: AmbientLight;
  private _grid?: Grid;
  private _axes?: Axes;
  private _player?: Player;
  private _decor?: Decor;
  private _firstTrack?: SceneTrack;

  private constructor(props: ISceneProps) {
    super(new ThreeScene());
    this._gui = WithGUI.createAndApply(this, props);
    this._audioPlayer = props.audioPlayer;
    this._obj3D.fog = props.fog;
  }

  get camera() {
    return this._camera;
  }
  get audioPlayer() {
    return this._audioPlayer;
  }
  get track() {
    return this._firstTrack;
  }

  private _setChildren(children: ISceneChildren) {
    if (typeof this._camera === "undefined") {
      this._camera = children.camera;
      this._ambientLight = children.ambientLight;
      this._grid = children.grid;
      this._axes = children.axes;
      this._player = children.player;
      this._decor = children.decor;
      this._firstTrack = children.firstTrack;
      this.add(
        this._camera,
        this._ambientLight,
        this._grid,
        this._axes,
        this._decor,
        this._player,
        this._firstTrack
      );
    }
  }

  private _enterVR() {
    if (this._player) {
      this._player.enterVR();
    }
    setTimeout(() => {
      if (!this._firstTrack) {
        return;
      }
      this._audioPlayer.load(this._firstTrack.bmTrack.songUrl);
    }, 500);
  }

  private _leaveVR() {
    if (this._player) {
      this._player.leaveVR();
    }
    this._audioPlayer.stop();
  }

  renderingComputation(t: number, dt: number, audioTime: number) {
    this.childrenRenderingComputations(t, dt, audioTime);
  }

  getObjectById(id: number) {
    console.log(this._children);
    // console.log(this._children.flat(1000));
    return getObjectByIdInArrayOrChildren(this._children, id);
  }

  static async create(props: ISceneProps): Promise<Scene> {
    const result: Scene = new Scene(props);
    props.vr.onVRStarted = result._enterVR.bind(result);
    props.vr.onVREnded = result._leaveVR.bind(result);
    const [camera, ambientLight, grid, axes, player, decor, firstTrack] =
      await Promise.all([
        Camera.create({
          fov: 55,
          aspect:
            props.viewport.initialWidth /
            Math.max(props.viewport.initialHeight, 1),
          near: 0.1,
          far: 200,
        }),
        AmbientLight.create(result._gui.container),
        Grid.create(result._gui.container),
        Axes.create(result._gui.container),
        Player.create({
          parentGUIContainer: result._gui.container,
          gltfLoader: props.gltfLoader,
          vr: props.vr,
          scene: result,
        }),
        Decor.create(result._gui.container, props.gltfLoader),
        SceneTrack.create("1", result._gui.container, props.gltfLoader),
      ]);
    result._setChildren({
      camera,
      ambientLight,
      grid,
      axes,
      player,
      decor,
      firstTrack,
    });
    return result;
  }
}

const getObjectByIdInArrayOrChildren = (
  array: Array<any>,
  id: number
): SceneNode<any> => {
  // console.log("initial array", array)
  let result: any = undefined;

  array.forEach((child) => {
    if (result) {
      return;
    }

    if (child.obj3D.id === id) {
      result = child;
      return;
    }

    // Does not work with mines, they don't have ._children
    if (child._children) {
      result = getObjectByIdInArrayOrChildren(child._children, id);
      return;
    }

    // Tried to fix it this way, did not work

    // if (child.obj3D.children) {
    //   result = getObjectByIdInArrayOrChildren(child.obj3D.children, id);
    //   return;
    // }
  });

  return result;
};
