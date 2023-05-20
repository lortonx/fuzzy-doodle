import { gsap } from 'gsap';
import * as PIXI from 'pixijs';

export class Entity {
    private readonly app: PIXI.Application;
    public sprite!: PIXI.Sprite;

    constructor(app: PIXI.Application) {
        this.app = app;
    }

    destroy(): void {
        this.sprite.destroy();
    }
}
