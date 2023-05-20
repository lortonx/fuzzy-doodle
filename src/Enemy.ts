import { gsap } from 'gsap';
import * as PIXI from 'pixijs';
import { Direction, State } from './Types';
import { Entity } from './Entity';

export class Enemy extends Entity {
    static config = {
        defaultAnimationSpeed: 0.15,
        walkDistance: 50,
        walkInterval: 3000
    };
    public sprite: PIXI.AnimatedSprite;

    directions: Record<Direction, Record<State, PIXI.Texture[]>>;
    direction: Direction = Direction.Down;
    state: State = State.Idle;

    private walkingInterval: NodeJS.Timer | undefined;
    currentAnimation?: gsap.core.Tween;

    constructor(app: PIXI.Application, x: number, y: number) {
        super(app);

        this.directions = {
            [Direction.Up]: {
                [State.Idle]: Array.from(
                    { length: 6 },
                    getAssetString.bind(12)
                ),
                [State.Walk]: Array.from({ length: 6 }, getAssetString.bind(30))
            },
            [Direction.Down]: {
                [State.Idle]: Array.from({ length: 6 }, getAssetString.bind(0)),
                [State.Walk]: Array.from({ length: 6 }, getAssetString.bind(18))
            },
            [Direction.Right]: {
                [State.Idle]: Array.from({ length: 6 }, getAssetString.bind(6)),
                [State.Walk]: Array.from({ length: 6 }, getAssetString.bind(24))
            },
            [Direction.Left]: {
                [State.Idle]: Array.from({ length: 6 }, getAssetString.bind(6)),
                [State.Walk]: Array.from({ length: 6 }, getAssetString.bind(24))
            }
        };

        this.sprite = new PIXI.AnimatedSprite(
            this.directions[this.direction][this.state]
        );
        this.sprite.animationSpeed = 0.15;
        this.sprite.loop = true;
        this.sprite.position.set(x, y);
        this.sprite.anchor.set(0.5);
        this.sprite.play();

        this.startWalking();
    }

    destroy(): void {
        this.currentAnimation?.kill();
        clearInterval(this.walkingInterval);
        super.destroy();
    }
    setDirection(direction: Direction): void {
        if (this.direction === direction) return;
        this.sprite.textures = this.directions[direction][this.state];
        this.sprite.play();
        if (direction === Direction.Left) {
            this.sprite.scale.x = -1;
        } else {
            this.sprite.scale.x = 1;
        }
    }
    startWalking(): void {
        this.walkingInterval = setInterval(() => {
            this.moveRandomly();
        }, Enemy.config.walkInterval);
    }
    setState(targetState = this.state): void {
        if (targetState === this.state) return;
        this.state = targetState;
        this.sprite.textures = this.directions[this.direction][this.state];
        this.sprite.animationSpeed = Enemy.config.defaultAnimationSpeed;
        this.sprite.play();
    }
    toggleState(): void {
        this.setState(State.Idle ? State.Walk : State.Idle);
    }
    moveRandomly(): void {
        const duration = 1.5;
        const distance = Math.random() * 50;

        const pi2 = Math.PI * 2;
        const angle = Math.random() * pi2;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        switch (true) {
            case angle > 0 && angle < Math.PI / 2:
                this.setDirection(Direction.Right);
                break;
            case angle > Math.PI / 2 && angle < Math.PI:
                this.setDirection(Direction.Down);
                break;
            case angle > Math.PI && angle < Math.PI * 1.5:
                this.setDirection(Direction.Left);
                break;
            case angle > Math.PI * 1.5 && angle < Math.PI * 2:
                this.setDirection(Direction.Up);
                break;
        }

        const x = this.sprite.x + dx;
        const y = this.sprite.y + dy;

        this.currentAnimation = gsap.fromTo(
            this.sprite,
            {
                animationSpeed: Enemy.config.defaultAnimationSpeed,
                onStart: () => {
                    this.setState(State.Walk);
                }
            },
            {
                x,
                y,
                animationSpeed: 0.05,
                duration,
                onComplete: () => {
                    this.setState(State.Idle);
                }
            }
        );
    }
}

function getAssetString(this: number, v: unknown, i: number) {
    const sprite_num = this + i;
    const str = `char/${sprite_num > 9 ? '' : '0'}${sprite_num}.png`;
    return PIXI.Assets.get(str);
}
