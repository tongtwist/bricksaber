import {
	Camera,
	Scene,
	Layers,
	Vector2,
	WebGLRenderer,
	ShaderMaterial
} from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import {
	GUIProperties,
	IPropsWithGUIOptions,
	WithGUI,
	IWithGUI,
	IGUINumberProperty
} from "."


interface IPostProcessingGUIProperties extends GUIProperties {
	readonly strength: IGUINumberProperty,
	readonly threshold: IGUINumberProperty
	readonly radius: IGUINumberProperty
}

interface IPostProcessingProps extends IPropsWithGUIOptions<IPostProcessingGUIProperties> {
	readonly renderer: WebGLRenderer
	readonly scene: Scene
	readonly camera: Camera
	readonly strenght?: number
	readonly threshold?: number
	readonly radius?: number
}

export default class PostProcessing {
	private static _defaultGUIProps: IPostProcessingGUIProperties = {
		strength: { type: "number", min: 0, max: 10, step: 0.01, label: "Strength" },
		threshold: { type: "number", min: 0, max: 10, step: 0.01, label: "Threshold" },
		radius: { type: "number", min: 0, max: 10, step: 0.01, label: "Radius" }
	}
	static NormalLayer = 0
	static BloomLayer = 1

	private readonly _renderer: WebGLRenderer
	private readonly _camera: Camera
	private readonly _bloomLayer: Layers
	private readonly _initialPass: RenderPass
	private readonly _bloomPass: UnrealBloomPass
	private readonly _composer: EffectComposer
	private readonly _gui: IWithGUI
	private _strength: number
	private _threshold: number
	private _radius: number

	constructor (props: IPostProcessingProps) {
		this._strength = props.strenght ?? 1.5
		this._threshold = props.threshold ?? 0
		this._radius = props.radius ?? 0.4
		this._renderer = props.renderer
		this._camera = props.camera
		this._bloomLayer = new Layers()
		this._bloomLayer.set(PostProcessing.BloomLayer)
		this._initialPass = new RenderPass(props.scene, this._camera)
		this._bloomPass = new UnrealBloomPass(
			new Vector2(window.innerWidth, window.innerHeight),
			this._strength,
			this._radius,
			this._threshold
		)
		this._composer = new EffectComposer(this._renderer)
		this._composer.addPass(this._initialPass)
		this._composer.addPass(this._bloomPass)
		this._gui = WithGUI.createAndApply(this, props, PostProcessing._defaultGUIProps)
	}

	get bloomLayer () { return this._bloomLayer }
	get bloomPass () { return this._bloomPass }
	get composer () { return this._composer }
	get strength () { return this._strength }
	set strength (v: number) {
		this._strength = Math.max(
			PostProcessing._defaultGUIProps.strength.min ?? 0,
			Math.min(PostProcessing._defaultGUIProps.strength.max ?? 10, v)
		)
		this._bloomPass.strength = this._strength
	}
	get threshold () { return this._threshold }
	set threshold (v: number) {
		this._threshold = Math.max(
			PostProcessing._defaultGUIProps.threshold.min ?? 0,
			Math.min(PostProcessing._defaultGUIProps.threshold.max ?? 10, v)
		)
		this._bloomPass.threshold = this._threshold
	}
	get radius () { return this._radius }
	set radius (v: number) {
		this._radius = Math.max(
			PostProcessing._defaultGUIProps.radius.min ?? 0,
			Math.min(PostProcessing._defaultGUIProps.radius.max ?? 10, v)
		)
		this._bloomPass.radius = this._radius
	}

}