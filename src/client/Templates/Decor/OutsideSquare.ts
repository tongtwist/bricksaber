import type {
	GUIContainer,
	IPropsWithGUIOptions
} from "../../Components"
import {
	Cylinder,
	ICylinderGUIProperties
} from "../../Templates/Cylinder"


export interface IOutsideSquareGUIProperties extends ICylinderGUIProperties {}

export interface IOutsideSquareProps
	extends IPropsWithGUIOptions<ICylinderGUIProperties>
{
	readonly visible?: boolean
	readonly radiusTop?: number
	readonly radiusBottom?: number
	readonly height?: number
	readonly radialSegments?: number
	readonly heightSegments?: number
	readonly openEnded?: boolean
	readonly color?: number
	readonly transparent?: boolean
	readonly opacity?: number
	readonly x?: number
	readonly y?: number
	readonly z?: number
}

export class OutsideDecorSquare extends Cylinder {
	constructor(props: IOutsideSquareProps) {
		super({
			...props,
			transparent: false, // -> Vraiment utile à true? Si non, désactiver pour les perfs
			opacity: 1,
			radiusTop: 8,
			radiusBottom: 8,
			height: 0.5,
			radialSegments: 4,
			heightSegments: 1,
			openEnded: true,
			color: 0xa4f4fa
		})
		this._obj3D.rotation.x = -Math.PI * 0.5
		typeof props.x === "number" && (this._obj3D.position.x = props.x)
		typeof props.y === "number" && (this._obj3D.position.y = props.y)
		typeof props.z === "number" && (this._obj3D.position.z = props.z)
	}
}
