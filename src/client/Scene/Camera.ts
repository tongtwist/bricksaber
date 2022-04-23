import {
	IPerspectiveCameraProps,
	PerspectiveCamera
} from "../Templates"


export default class camera extends PerspectiveCamera {
	constructor (props: IPerspectiveCameraProps) {
		super({...props, x: props.x ?? 8, y: props.y ?? 7, z: props.z ?? 15})
		this._obj3D.layers.enable(1);
	}
}