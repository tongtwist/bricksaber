import {
	IPerspectiveCameraProps,
	PerspectiveCamera
} from "../Templates"


export default class Camera extends PerspectiveCamera {
	private constructor (
		props: IPerspectiveCameraProps
	) {
		super({...props, x: props.x ?? 6, y: props.y ?? 6, z: props.z ?? 10})
		this._obj3D.lookAt(0, 1, -51)
	}

	static async create (
		props: IPerspectiveCameraProps
	): Promise<Camera> {
		return new Camera(props)
	}
}