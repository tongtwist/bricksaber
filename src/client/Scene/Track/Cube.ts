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

export interface ICubeProps {
  readonly x: number;
  readonly y: number;
  readonly rotation: number;
  // TODO use proper type
  readonly m: any;
}

export class Cube extends SceneNode<Mesh> {
  private static _rotations = [
    Math.PI,
    0,
    -0.5 * Math.PI,
    0.5 * Math.PI,
    -0.75 * Math.PI,
    0.75 * Math.PI,
    -0.25 * Math.PI,
    0.25 * Math.PI,
    0,
  ];
  private static _cubeGeometry = new BoxBufferGeometry(0.8, 0.8, 0.8);
  private static _bm = new Mesh(
    Cube._cubeGeometry,
    new MeshBasicMaterial({ color: 0x0000ff })
  );
  private static _rm = new Mesh(
    Cube._cubeGeometry,
    new MeshBasicMaterial({ color: 0xff0000 })
  );
  static redCenterCubeModel: Group;
  static redDirectionalCubeModel: Group;
  static blueCenterCubeModel: Group;
  static blueDirectionalCubeModel: Group;

  private constructor(props: ICubeProps) {
    super(props.m);
    this._obj3D.position.x = props.x;
    this._obj3D.position.y = props.y;
    this._obj3D.rotation.z = props.rotation;
  }

  public static async _loadModels(gltfLoader: GLTFLoader): Promise<void> {
    const redColor = new Color(0xff0000);
    const blueColor = new Color(0x0000ff);
    const redCenterCubeModel = await gltfLoader.loadAsync(
      "/assets/models/centerCube.gltf",
      (progress) =>
        console.log(
          `Scene->Track->"centerCube": model load progress: ${JSON.stringify(
            progress
          )}`
        )
    );
    const blueCenterCubeModel = await gltfLoader.loadAsync(
      "/assets/models/centerCube.gltf",
      (progress) =>
        console.log(
          `Scene->Track->"centerCube": model load progress: ${JSON.stringify(
            progress
          )}`
        )
    );
    const redDirectionalCubeModel = await gltfLoader.loadAsync(
      "/assets/models/directionalCube.gltf",
      (progress) =>
        console.log(
          `Scene->Track->"directionalCube": model load progress: ${JSON.stringify(
            progress
          )}`
        )
    );
    const blueDirectionalCubeModel = await gltfLoader.loadAsync(
      "/assets/models/directionalCube.gltf",
      (progress) =>
        console.log(
          `Scene->Track->"directionalCube": model load progress: ${JSON.stringify(
            progress
          )}`
        )
    );
    redCenterCubeModel.scene.scale.set(0.3, 0.3, 0.3);
    redDirectionalCubeModel.scene.scale.set(0.3, 0.3, 0.3);
    blueCenterCubeModel.scene.scale.set(0.3, 0.3, 0.3);
    blueDirectionalCubeModel.scene.scale.set(0.3, 0.3, 0.3);

    // const light = new THREE.PointLight(0xffffff, 1, 4);
    // redCenterCubeModel.scene.add(light.clone());
    // redDirectionalCubeModel.scene.add(light.clone());
    // blueCenterCubeModel.scene.add(light.clone());
    // blueDirectionalCubeModel.scene.add(light.clone());

    this.redCenterCubeModel = redCenterCubeModel.scene;
    this.redCenterCubeModel.traverse((object) => {
      if (object.type === "Mesh") {
        //@ts-ignore
        const material = object.material;
        material.color = redColor;
      }
    });

    this.redDirectionalCubeModel = redDirectionalCubeModel.scene;
    this.redDirectionalCubeModel.traverse((object) => {
      if (object.type === "Mesh") {
        //@ts-ignore
        const material = object.material;
        material.color = redColor;
      }
    });

    this.blueCenterCubeModel = blueCenterCubeModel.scene;
    this.blueCenterCubeModel.traverse((object) => {
      if (object.type === "Mesh") {
        //@ts-ignore
        const material = object.material;
        material.color = blueColor;
      }
    });

    this.blueDirectionalCubeModel = blueDirectionalCubeModel.scene;
    this.blueDirectionalCubeModel.traverse((object) => {
      if (object.type === "Mesh") {
        //@ts-ignore
        const material = object.material;
        material.color = blueColor;
      }
    });
  }

  static getModel(cutDirection: number, type: number) {
    if (cutDirection === 8) {
      if (type === 0) {
        return this.blueCenterCubeModel.clone();
      }

      return this.redCenterCubeModel.clone();
    }

    if (type === 0) {
      return this.blueDirectionalCubeModel.clone();
    }

    return this.redDirectionalCubeModel.clone();
  }

  static fromBM(block: IBeatmapBlock): Cube {
    return new Cube({
      x: block.lineIndex - 1.5,
      y: block.lineLayer - 1,
      rotation: Cube._rotations[Math.min(8, Math.max(0, block.cutDirection))],
      m: Cube.getModel(block.cutDirection, block.type),
    });
  }
}
