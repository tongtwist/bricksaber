import {
	WebGLRenderer,
	Event as ThreeEvent,
	EventListener as ThreeEventListener,
	WebXRManager,
	Group,
	ArrayCamera,
	PerspectiveCamera
} from "three"
import { VRButton } from 'three/examples/jsm/webxr/VRButton'


export type TOnVRStarted = ThreeEventListener<ThreeEvent, "sessionstart", WebXRManager>
export type TOnVREnded = ThreeEventListener<ThreeEvent, "sessionend", WebXRManager>

export interface IVRProps {
	readonly renderer: WebGLRenderer
	readonly container: HTMLElement
	readonly onVRStarted?: TOnVRStarted
	readonly onVREnded?: TOnVREnded
}

export class VR {
	private readonly _renderer: WebGLRenderer
	private _cameras: ArrayCamera | PerspectiveCamera
	private _lastCameraUpdateAt: number
	private _vrStateSince: number
	private _leftHand: Group
	private _rightHand: Group
	private _leftHandTarget: Group
	private _rightHandTarget: Group
	private _onVRStarted?: TOnVRStarted
	private _onVREnded?: TOnVREnded

	private constructor (
		props: IVRProps
	) {
		this._renderer = props.renderer
		this._renderer.xr.enabled = true
		this._lastCameraUpdateAt = Date.now()
		this._vrStateSince = this._lastCameraUpdateAt
		this._cameras = (((this._renderer.xr.getCamera) as unknown) as () => ArrayCamera | PerspectiveCamera)()
		this._leftHand = this._renderer.xr.getControllerGrip(0)
		this._rightHand = this._renderer.xr.getControllerGrip(1)
		this._leftHandTarget = this._renderer.xr.getController(0)
		this._rightHandTarget = this._renderer.xr.getController(1)
		this.onVRStarted = props.onVRStarted
		this.onVREnded = props.onVREnded
		this._renderer.xr.addEventListener("sessionstart", this._onStart.bind(this))
		this._renderer.xr.addEventListener("sessionend", this._onEnd.bind(this))
	}

	get renderer () { return this._renderer }
	get nowInVR () { return this._renderer.xr.isPresenting }
	get onVRStarted () { return this._onVRStarted }
	set onVRStarted (v: TOnVRStarted | undefined) {
		this._onVRStarted = v
	}
	get onVREnded () { return this._onVREnded }
	set onVREnded (v: TOnVREnded | undefined) {
		this._onVREnded = v
	}
	get cameras () {
		if (this._lastCameraUpdateAt < this._vrStateSince) {
			this._cameraUpdate()
		}
		return this._cameras
	}
	get leftHand () { return this._leftHand }
	get rightHand () { return this._rightHand }
	get leftTarget () { return this._leftHandTarget }
	get rightTarget () { return this._rightHandTarget }

	private _cameraUpdate(): void {
		this._lastCameraUpdateAt = Date.now()
		this._cameras = (((this._renderer.xr.getCamera) as unknown) as () => ArrayCamera | PerspectiveCamera)()
	}
	
	private _onStart (
		evt: ThreeEvent & { type: "sessionstart", target: WebXRManager }
	): void {
		this._vrStateSince = Date.now()
		this._onVRStarted && this._onVRStarted(evt)
	}

	private _onEnd (
		evt: ThreeEvent & { type: "sessionend", target: WebXRManager }
	): void {
		this._vrStateSince = Date.now()
		this._onVREnded && this._onVREnded(evt)
	}
	
	static create (
		props: IVRProps
	): VR {
		const res = new VR(props)
		props.container.appendChild(VRButton.createButton(res.renderer))
		return res
	}
}