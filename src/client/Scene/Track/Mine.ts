import {
  BoxBufferGeometry,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
} from "three";
import { SceneNode } from "../../Templates";
import type { IBeatmapBlock } from "../../Components";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { Cube } from "./Cube";

export interface IMineProps {
  readonly x: number;
  readonly y: number;
  readonly m: any;
}

export class Mine extends SceneNode<Mesh> {
  static model: Group;

  private constructor(props: IMineProps) {
    super(props.m);
    this._obj3D.position.x = props.x;
    this._obj3D.position.y = props.y;
  }

  public static async _loadModel(gltfLoader: GLTFLoader): Promise<void> {
    // const redColor = new Color(0xff0000);
    // const blueColor = new Color(0x0000ff);
    const mineModel = await gltfLoader.loadAsync(
      "/assets/models/mine.gltf",
      (progress) =>
        console.log(
          `Scene->Track->"mine": model load progress: ${JSON.stringify(
            progress
          )}`
        )
    );

    mineModel.scene.scale.set(0.3, 0.3, 0.3);

    this.model = mineModel.scene;
  }

  static getModel() {
    return this.model.clone()
  }

  static fromBM(block: IBeatmapBlock): Mine {
    return new Mine({
      x: block.lineIndex - 1.5,
      y: block.lineLayer - 1,
      m: Mine.getModel(),
    });
  }
}
