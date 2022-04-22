import {
  Mesh,
  CylinderGeometry,
  MeshBasicMaterial,
  Color,
  DoubleSide,
} from "three";

import {
  GUIProperties,
  IGUIBooleanProperty,
  IGUIColorProperty,
  IGUINumberProperty,
  IPropsWithGUIOptions,
  IWithGUI,
  WithGUI,
} from "../Components";
import { SceneNode } from "./SceneNode";

export interface ICylinderGUIProperties extends GUIProperties {
  readonly visible: IGUIBooleanProperty;
  readonly height: IGUINumberProperty;
  readonly color: IGUIColorProperty;
  readonly opacity: IGUINumberProperty;
}

export interface ICylinderProps
  extends IPropsWithGUIOptions<ICylinderGUIProperties> {
  readonly visible?: boolean;
  readonly radiusTop: number;
  readonly radiusBottom: number;
  readonly height: number;
  readonly radialSegments: number;
  readonly heightSegments: number;
  readonly openEnded: boolean;
  readonly color: number;
  readonly transparent?: boolean;
  readonly opacity?: number;
}

export class Cylinder extends SceneNode<Mesh> {
  private _color: number;
  private _initialHeight: number;
  protected readonly _gui: IWithGUI;

  constructor(props: ICylinderProps) {
    super(
      new Mesh(
        new CylinderGeometry(
          props.radiusTop,
          props.radiusBottom,
          props.height,
          props.radialSegments,
          props.heightSegments,
          props.openEnded
        ),
        new MeshBasicMaterial({
          color: props.color,
          side: DoubleSide,
          visible: props.visible ?? true,
          transparent: props.transparent ?? false,
          opacity: props.opacity ?? 1,
        })
      )
    );
    this._color = props.color;
    this._initialHeight = props.height || 1;

    this._gui = WithGUI.createAndApply(this, props, {
      visible: { type: "boolean" },
      color: { type: "color" },
      height: { type: "number", min: 0, max: 10, step: 0.1 },
      opacity: { type: "number", min: 0, max: 1, step: 0.01 },
    });
  }

  get visible() {
    return this._obj3D.visible;
  }
  set visible(v: boolean) {
    this._obj3D.visible = v;
  }
  get color() {
    return this._color;
  }
  set color(c: number) {
    this._color = Math.max(0, c);
    (this._obj3D.material as MeshBasicMaterial).color.set(
      new Color(this._color)
    );
  }

  get height() {
    return this._obj3D.scale.y * this._initialHeight;
  }
  set height(height: number) {
    this._obj3D.scale.y = height / this._initialHeight;
  }

  get opacity() {
    return (this._obj3D.material as MeshBasicMaterial).opacity;
  }
  set opacity(v: number) {
    (this._obj3D.material as MeshBasicMaterial).opacity = v;
  }
}
