import * as PIXI from 'pixijs';
import { Entity } from './Entity';
import { Enemy } from './Enemy';
import enemies from './enemies.json';
import { EnemyData } from './Types';
export class Game {
    private app: PIXI.Application;
    private enemies: Entity[] = [];
    counter!: PIXI.Text;
    constructor(app: PIXI.Application) {
        this.app = app;
        this.loadAssets().then(() => {
            this.createBackground();
            this.createEnemies(enemies);
            this.createCounter();
            this.setupClickHandler();
        });
    }

    loadAssets() {
        const resourcesMap = {
            char: 'assets/char.json',
            bg: 'assets/background.png'
        };
        const list = Object.entries(resourcesMap).map(([alias, src]) => ({
            src: src,
            alias: [alias]
        }));
        return PIXI.Assets.load(list);
    }

    createBackground(): void {
        const background = new PIXI.Sprite(PIXI.Assets.get('bg'));
        background.width = this.app.screen.width;
        background.height = this.app.screen.height;
        this.app.stage.addChild(background);
    }

    createEnemies(enemies: EnemyData[]): void {
        for (const enemyData of enemies) {
            const enemy = new Enemy(this.app, enemyData.x, enemyData.y);
            this.app.stage.addChild(enemy.sprite);
            this.enemies.push(enemy);
        }
    }

    createCounter(): void {
        const style = new PIXI.TextStyle({
            fill: '#ffffff'
        });

        this.counter = new PIXI.Text(``, style);
        this.counter.position.set(10, 10);
        this.app.stage.addChild(this.counter);
        this.app.ticker.add(this.updateCounter);
    }
    updateCounter = () => {
        this.counter.text = `Enemies: ${this.enemies.length}`;
    };

    setupClickHandler(): void {
        this.app.stage.interactive = true;
        this.app.stage.on('pointerdown', (event: PIXI.FederatedEvent) => {
            const position = new PIXI.Point(event.pageX, event.pageY);
            this.removeEnemyAtPosition(position);
        });
    }

    removeEnemyAtPosition(position: PIXI.Point): void {
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
