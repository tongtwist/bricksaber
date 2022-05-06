import {
	IPerspectiveCameraProps,
	PerspectiveCamera
} from "../Templates"


export default class Camera extends PerspectiveCamera {
	private constructor (
		props: IPerspectiveCameraProps
	) {
		super({
			...props,
			x: props.x ?? 3,
			y: props.y ?? 3,
			z: props.z ?? 8
		})
	}

	static async create (
		props: IPerspectiveCameraProps
	): Promise<Camera> {
		return new Camera(props)
	}
}