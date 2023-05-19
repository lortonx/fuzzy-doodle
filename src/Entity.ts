import { Loader } from '@pixi/loaders';
import * as PIXI from 'pixi.js';

export class Entity {
    private readonly app: PIXI.Application;
    static atlasTexture = Loader.shared.resources['atlas'].textures;

    public sprite: PIXI.AnimatedSprite;

    constructor(app: PIXI.Application, x: number, y: number) {
        this.app = app;

        const textures = [PIXI.Texture.WHITE];

        this.sprite = new PIXI.AnimatedSprite(textures);
        this.sprite.animationSpeed = 0.1;
        this.sprite.loop = true;
        this.sprite.position.set(x, y);
        this.sprite.play();
    }

    public destroy(): void {
        this.sprite.destroy();
    }
}
