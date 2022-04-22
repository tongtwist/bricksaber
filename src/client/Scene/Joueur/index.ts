import * as THREE from "three";
import {SceneNode} from "../../Templates";
import {Sabre} from "./Sabre";
import {Light} from "./Light";
import {AmbientLight} from "./AmbientLight";
import {Group} from "../../Templates";
import {
  IPropsWithGUIOptions,
  WithGUI,
  IWithGUI,
} from "../../Components/WithGUI";

export class Joueur extends SceneNode<THREE.Mesh> {
  readonly group: Group;
  private readonly _gui: IWithGUI;

  public constructor(opt: IPropsWithGUIOptions) {
    const geometry = new THREE.BoxGeometry(1, 1, 1, 1);
    const material = new THREE.MeshLambertMaterial({color: 0xffffff});

    super(new THREE.Mesh(geometry, material));
    this._gui = WithGUI.create(opt);

    const sabre = new Sabre();
    const sabre2 = new Sabre();
    const light = new Light();
    const ambientLight = new AmbientLight();

    this.group = new Group({
      visible: true,
      name: "groupBody",
      gui: {
        container: this._gui.container,
      },
    });

    sabre.obj3D.position.x = 1;
    sabre2.obj3D.position.x = -1;

    //this.obj3D.rotation.x = this.degreesToRadians(10)
    //this.obj3D.rotation.y = this.degreesToRadians(10)

    this.add(sabre)
    this.add(sabre2)
    this.add(light);
    this.add(ambientLight);
  }
  public renderingComputation(time: number): void {}

  material = new THREE.MeshLambertMaterial({color: 0xffffff});

  createHead() {
    const material = new THREE.MeshLambertMaterial({color: 0xea80fc});
    const geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    //const geometry = new THREE.SphereGeometry( 0.8, 10,10);
    const head = new THREE.Mesh(geometry, material);
    this.obj3D.add(head);
    // Position it above the body
    head.position.y = 1.65;
  }

  createBody() {
    const geometry = new THREE.BoxGeometry(1, 1.5, 1);
    const body = new THREE.Mesh(geometry, this.material);
    this.obj3D.add(body);
  }
  createHarms() {
    for (let i = 0; i < 2; i++) {
      const material = new THREE.MeshLambertMaterial({color: 0xea80fc});
      const geometry = new THREE.BoxGeometry(0.25, 1, 0.25);
      const arm = new THREE.Mesh(geometry, material);
      const m = i % 2 === 0 ? 1 : -1;

      this.obj3D.add(arm);

      arm.position.x = m * 0.8;
      arm.position.y = 0.1;
      arm.rotation.z = this.degreesToRadians(30 * m);
    }
  }

  init() {
    this.createHead();
    this.createBody();
    this.createHarms();
  }

  degreesToRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
  };
}
