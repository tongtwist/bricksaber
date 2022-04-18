import {
	IPerspectiveCameraProps,
	PerspectiveCamera
} from "../Templates"


export default class camera extends PerspectiveCamera {
	constructor (props: IPerspectiveCameraProps) {
		super({...props, x: props.x ?? 15, y: props.y ?? 10, z: props.z ?? 15})
	}
}