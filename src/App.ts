import * as PIXI from 'pixijs';
import { Game } from './Game';
export class App {
    readonly canvas: HTMLCanvasElement;
    readonly app: PIXI.Application;
    width = 800;
    height = 600;
    game: Game;
    constructor() {
        this.canvas = document.querySelector('#app') as HTMLCanvasElement;
        this.app = new PIXI.Application({
            view: this.canvas,
            width: this.width,
            height: this.height,
            backgroundColor: 0x00dd00
        });
        this.game = new Game(this.app);
    }
}
