import {
	GUI,
	GUIController
} from "dat.gui"


export type GUIContainer = GUI

export type GUIControllerType
	= "boolean"
	| "number"
	| "color"

export interface IGUIProperty<Type extends GUIControllerType, T> {
	readonly type: Type
	readonly label?: string
	readonly onChange?: (v: T) => void
}

export interface IGUIBooleanProperty extends IGUIProperty<"boolean", boolean> {}

export interface IGUINumberProperty extends IGUIProperty<"number", number> {
	readonly min?: number
	readonly max?: number
	readonly step?: number
}

export interface IGUIColorProperty extends IGUIProperty<"color", number> {}

export type GUIPropertyKind
	= IGUIBooleanProperty
	| IGUINumberProperty
	| IGUIColorProperty

export type GUIProperties = { readonly [propName: string]: GUIPropertyKind }

export interface IGUIOptions<P extends GUIProperties = GUIProperties> {
	readonly container: GUIContainer
	readonly properties?: P
	readonly open?: boolean
}

export interface IPropsWithGUIOptions<P extends GUIProperties = {}> {
	readonly name: string
	readonly gui: IGUIOptions<P>
}

export interface IWithGUI<P extends GUIProperties = {}> {
	readonly name: string
	readonly parentContainer: GUIContainer
	readonly container: GUIContainer
	apply (o: Object, properties?: P, defaultProperties?: P): IWithGUI<P>
}

type PropertyFactory
	= (container: GUIContainer, o: Object, propName: string, opts: GUIPropertyKind) => void

export class WithGUI<P extends GUIProperties = {}>
	implements IWithGUI<P>
{
	private readonly _container: GUIContainer

	private constructor (
		private readonly _name: string,
		private readonly _parentContainer: GUIContainer
	) {
		this._container = this._parentContainer.addFolder(this._name)
	}

	get name () { return this._name }
	get parentContainer () { return this._parentContainer }
	get container () { return this._container }

	private static _propFactories: { [type: string]: PropertyFactory } = {
		"boolean": WithGUI.guiBooleanProperty as PropertyFactory,
		"number": WithGUI.guiNumberProperty as PropertyFactory,
		"color": WithGUI.guiColorProperty as PropertyFactory,
	}

	private static _invokeFactory(
		container: GUIContainer,
		o: Object,
		propName: string,
		opts: GUIPropertyKind
	) {
		WithGUI._propFactories[opts.type] && WithGUI._propFactories[opts.type](container, o, propName, opts)
	}
	
	static guiProperty<T> (
		container: GUIContainer,
		o: Object,
		propName: string,
		opts: IGUIProperty<GUIControllerType, T>
	): GUIController {
		const controller: GUIController = container.add(o, propName)
		opts.onChange && controller.onChange(opts.onChange)
		opts.label && controller.name(opts.label)
		return controller
	}

	static guiBooleanProperty (
		container: GUIContainer,
		o: Object,
		propName: string,
		opts: IGUIBooleanProperty
	) {
		WithGUI.guiProperty<boolean>(container, o, propName, opts)
	}
	
	static guiNumberProperty (
		container: GUIContainer,
		o: Object,
		propName: string,
		opts: IGUINumberProperty
	) {
		const controller
			= container.add(o, propName, opts.min, opts.max, opts.step)
		opts.onChange && controller.onChange(opts.onChange)
		opts.label && controller.name(opts.label)
	}

	static guiColorProperty (
		container: GUIContainer,
		o: Object,
		propName: string,
		opts: IGUIColorProperty
	) {
		const controller: GUIController = container.addColor(o, propName)
		opts.onChange && controller.onChange(opts.onChange)
		opts.label && controller.name(opts.label)
	}

	static create<P extends GUIProperties> (
		opts: IPropsWithGUIOptions<P>
	): IWithGUI<P> {
		return new WithGUI<P>(opts.name, opts.gui.container)
	}

	apply (
		o: Object,
		properties?: P,
		defaultProperties?: P
	): IWithGUI<P> {
		const props: P | {} = properties ?? defaultProperties ?? {}
		for (const propName in props) {
			WithGUI._invokeFactory(this.container, o, propName, (props as P)[propName])
		}
		return this
	}

	static createAndApply<P extends GUIProperties> (
		o: Object,
		opts: IPropsWithGUIOptions<P>,
		defaultProperties?: P
	): IWithGUI<P> {
		return WithGUI
			.create<P>(opts)
			.apply(o, opts.gui.properties, defaultProperties)
	}
}