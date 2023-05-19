import * as PIXI from 'pixi.js';
import { Entity } from './Entity';

export class Game {
    private app: PIXI.Application;
    private enemies: Entity[] = [];

    constructor(app: PIXI.Application) {
        this.app = app;
    }

    public start(): void {
        this.loadAssets(() => {
            this.createBackground();
            this.createEnemies();
            this.createCounter();
            this.setupClickHandler();
        });
    }

    private loadAssets(callback: () => void): void {
        // PIXI.Loader.shared.add('atlas', 'assets/atlas.json').load(callback);
    }

    private createBackground(): void {
        const background = new PIXI.Sprite(PIXI.Texture.from('background.png'));
        this.app.stage.addChild(background);
    }

    private createEnemies(): void {
        const enemiesData = [
            { x: 100, y: 200 },
            { x: 300, y: 400 },
            { x: 500, y: 100 }
        ];

        for (const enemyData of enemiesData) {
            const enemy = new Entity(this.app, enemyData.x, enemyData.y);
            this.app.stage.addChild(enemy.sprite);
            this.enemies.push(enemy);
        }
    }

    private createCounter(): void {
        const style = new PIXI.TextStyle({
            fill: '#ffffff'
        });

        const counter = new PIXI.Text(`Enemies: ${this.enemies.length}`, style);
        counter.position.set(10, 10);
        this.app.stage.addChild(counter);

        this.app.ticker.add(() => {
            counter.text = `Enemies: ${this.enemies.length}`;
        });
    }

    private setupClickHandler(): void {
        this.app.stage.interactive = true;
        this.app.stage.on('pointerdown', (event: PIXI.FederatedEvent) => {
            const position = new PIXI.Point(event.pageX, event.pageY);
            this.removeEnemyAtPosition(position);
        });
    }

    private removeEnemyAtPosition(position: PIXI.Point): void {
        const enemyToRemove = this.enemies.find((enemy) => {
            const enemyPosition = enemy.sprite.position;
            const enemyBounds = enemy.sprite.getBounds();
            return (
                position.x >= enemyPosition.x &&
                position.x <= enemyPosition.x + enemyBounds.width &&
                position.y >= enemyPosition.y &&
                position.y <= enemyPosition.y + enemyBounds.height
            );
        });

        if (enemyToRemove) {
            enemyToRemove.destroy();
            this.enemies = this.enemies.filter(
                (enemy) => enemy !== enemyToRemove
            );
        }
    }
}
