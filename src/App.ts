import * as PIXI from 'pixi.js';
// import { Game } from './Game';

export class App {
    readonly canvas: HTMLCanvasElement;
    readonly app: PIXI.Application;
    // game: Game;
    constructor() {
        this.canvas = document.querySelector('#game') as HTMLCanvasElement;
        this.app = new PIXI.Application({
            view: this.canvas,
            width: 800,
            height: 600,
            backgroundColor: 0x1099bb
        });
        // this.game = new Game(this.app);
        // this.game.start();
    }
}
