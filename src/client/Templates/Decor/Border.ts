import {
	IBoxBloomedProps,
	BoxBloomed
} from "../BoxBloomed"


export interface IBorderProps extends IBoxBloomedProps {}

export class Border extends BoxBloomed {
	constructor (props: IBorderProps) {
		super({
			...props,
			width: props.width ?? 200,
			height: props.height ?? 0.25,
			length: props.length ?? 0.25,
			color: props.color ?? 0xffffff,
			yRotation: Math.PI / 2
		})
	}
}