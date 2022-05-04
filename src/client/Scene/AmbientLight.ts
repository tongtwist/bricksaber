import { AmbientLight as ThreeAmbientLight } from "three"

import {
	GUIContainer,
	IWithGUI,
	WithGUI
} from "../Components"
import { SceneNode } from "../Templates"

export default class AmbientLight extends SceneNode<ThreeAmbientLight> {
	private _color: number
	private _intensity: number
	private readonly _gui: IWithGUI

	private constructor (
		parentContainer: GUIContainer
	) {
		const color = 0xffffff
		const intensity = 0.8
		super(new ThreeAmbientLight(color, intensity))
		this._color = color
		this._intensity = intensity
		this._gui = WithGUI.createAndApply(this, {
			name: "Ambient Light",
			gui: {
				container: parentContainer,
				properties: {
					color: { type: "color", label: "Color" },
					intensity: { type: "number", min: 0, max: 1, step: 0.01, label: "Intensity" }
				}
			}
		})
	}

	get color () { return this._color }
	set color (v: number) {
		this._color = Math.min(0xffffff, Math.max(0, v))
		this._obj3D.color.set(this._color)
	}
	get intensity () { return this._intensity }
	set intensity (v: number) {
		this._intensity = Math.min(1, Math.max(0, v))
		this._obj3D.intensity = this._intensity
	}

	static async create (
		parentContainer: GUIContainer
	): Promise<AmbientLight> {
		return new AmbientLight(parentContainer)
	}
}