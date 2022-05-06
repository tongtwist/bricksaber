import type { GUIContainer } from "../../Components";
import { Border, Group, OutsideDecorSquare } from "../../Templates";
import Trail from "./Trail";
import { PlayerPlatform } from "./Platform";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class Decor extends Group {
  private readonly _track: PlayerPlatform;
  private readonly _trail: Trail;
  private readonly _outsideSquares: Array<OutsideDecorSquare>;
  private readonly _outsideLines1: Array<Border>;
  private readonly _outsideLines2: Array<Border>;
  private readonly _outsideLines3: Array<Border>;

  private constructor(parentGUIContainer: GUIContainer) {
    super({
      name: "Decor",
      gui: { container: parentGUIContainer },
    });
    this._track = new PlayerPlatform(this._gui.container);
    this._trail = new Trail(this._gui.container);
    this._outsideSquares = [];
    this._outsideLines1 = [];
    this._outsideLines2 = [];
    this._outsideLines3 = [];
    for (let i = 0; i < 10; i++) {
      const outside = new OutsideDecorSquare({
        name: `Outside Square ${i.toString()}`,
        y: 3,
        z: -i * (40 / 9) - 12 - 1,
        gui: { container: this._gui.container },
      });

      const line1 = new Border({
        name: `Outside Line ${i.toString()}`,
        height: 50,
        color: 0xa4f4fa,
        x: i % 2 == 0 ? 10 : -10,
        y: -5,
        z: -i * (40 / 9) - 12 - 1,
        zRotation: i % 2 == 0 ? -0.5 : 0.5,
        gui: { container: this._gui.container },
      });

      const line2 = new Border({
        name: `Outsiffde Line ${i.toString()}`,
        height: 50,
        color: 0xa4f4fa,
        x: i % 2 == 0 ? 10 : -10,
        y: 3,
        z: -i * (40 / 9) - 12 - 1,
        xRotation: 0.5,
        zRotation: i % 2 == 0 ? 0.5 : -0.5,
        gui: { container: this._gui.container },
      });

      const line3 = new Border({
        name: `Outside Horizontal Line ${i.toString()}`,
        height: 50,
        color: 0xa4f4fa,
        x: i % 2 == 0 ? 10 : -10,
        y: 3 + i,
        z: -i * (40 / 9) - 12 - 1,
        xRotation: 1.5,
        gui: { container: this._gui.container },
      });

      outside.obj3D.layers.enable(1);
      line1.obj3D.layers.enable(1);
      line2.obj3D.layers.enable(1);
      line3.obj3D.layers.enable(1);
      this._outsideSquares.push(outside);
      this._outsideLines1.push(line1);
      this._outsideLines2.push(line2);
      this._outsideLines3.push(line3);
    }

    this.add(
      this._track,
      this._trail,
      ...this._outsideSquares,
      ...this._outsideLines1,
      ...this._outsideLines2,
      ...this._outsideLines3
    );
  }

  get track() {
    return this._track;
  }
  get trail() {
    return this._trail;
  }
  get outsideSquares() {
    return this._outsideSquares;
  }
  get ousiteLines1() {
    return this._outsideLines1;
  }

  get ousiteLines2() {
    return this._outsideLines2;
  }

  get ousiteLines3() {
    return this._outsideLines3;
  }

  static async create(
    parentContainer: GUIContainer,
    gltfLoader: GLTFLoader
  ): Promise<Decor> {
    return new Decor(parentContainer);
  }
}
