import type { GUIContainer } from "../../../Components"
import { Platform } from "../../../Templates"
import { BoxBloomed } from "../../../Templates/BoxBloomed";

export class PlayerPlatform extends Platform {
	constructor(parentGUIContainer: GUIContainer) {
		super({
			name: "Platforme",
			width: 2,
			height: 2,
			length: 0.25,
			color: 0x7f7f7f,
			gui: { container: parentGUIContainer },
			reflectivity: .5,
			transmission: .5,
			roughness: .5,
			metalness: .5,
			clearcoat: .5,
			clearcoatRoughness: .5,
			ior: .5
		})
		this._obj3D.rotation.x = -Math.PI * .5
		this._obj3D.position.y = 0.50;
		const playerPlatformLeftBorder = new PlayerPlatformLeftBorder(this._gui.container);
		this.add(playerPlatformLeftBorder)
		const playerPlatformRightBorder = new PlayerPlatformRightBorder(this._gui.container)
		this.add(playerPlatformRightBorder)
		const playerPlatformTopBorder = new PlayerPlatformTopBorder(this._gui.container);
		this.add(playerPlatformTopBorder)
		const playerPlatformBottomBorder = new PlayerPlatformBottomBorder(this._gui.container)
		this.add(playerPlatformBottomBorder)
	}
}

export class PlayerPlatformLeftBorder extends BoxBloomed {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatformLeftBorder",
			width: 0.15,
			height: 2,
			length: 0.25,
			color: 0xffffff,
			gui: { container: parentGUIContainer },
		});
		this._obj3D.position.x = -(1 + 0.15/2);
		this._obj3D.layers.enable(1)
	}
}

export class PlayerPlatformRightBorder extends BoxBloomed {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatformRightBorder",
			width: 0.15,
			height: 2,
			length: 0.25,
			color: 0xffffff,
			gui: { container: parentGUIContainer },
		});
		this._obj3D.position.x = 1 + 0.15/2;
		this._obj3D.layers.enable(1)
	}
}

export class PlayerPlatformTopBorder extends BoxBloomed {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatformTopBorder",
			width: 0.15,
			height: 2.3,
			length: 0.25,
			color: 0xffffff,
			gui: { container: parentGUIContainer },
		});
		this._obj3D.position.y = -(1 + 0.15/2);
		this._obj3D.rotation.z = -Math.PI * .5;
		this._obj3D.layers.enable(1)
	}
}

export class PlayerPlatformBottomBorder extends BoxBloomed {
	constructor (parentGUIContainer: GUIContainer) {
		super({
			name: "PlayerPlatformBottomBorder",
			width: 0.15,
			height: 2.3,
			length: 0.25,
			color: 0xffffff,
			gui: { container: parentGUIContainer },
		});
		this._obj3D.position.y = 1 + 0.15/2;
		this._obj3D.rotation.z = Math.PI * .5;
		this._obj3D.layers.enable(1)
	}
}