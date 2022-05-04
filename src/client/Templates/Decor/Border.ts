import {
	IBoxBloomedProps,
	BoxBloomed
} from "../BoxBloomed"


export interface IBorderProps extends IBoxBloomedProps {}

export class Border extends BoxBloomed {
	constructor (props: IBorderProps) {
		super({
			...props,
			width: props.width ?? 0.05,
			height: props.height ?? 0.05,
			length: props.length ?? 0.05,
			color: props.color ?? 0xc0c0c0
		})
	}
}