export enum Direction {
    Up,
    Down,
    Right,
    Left
}

export enum State {
    Idle,
    Walk
}

export type EnemyData = {
    x: number;
    y: number;
};
