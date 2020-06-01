import { Container, Graphics } from 'pixi.js';
export declare function getGame(): SCENE.IGame;
export declare function getStage(): SCENE.Stage;
export declare class Component extends Container {
    ratios: {
        x: number;
        y: number;
    };
    game: SCENE.IGame;
    stage: SCENE.Stage;
    constructor();
    get ratio(): number;
}
export declare class SizeComponent extends Graphics {
    ratios: {
        x: number;
        y: number;
    };
    game: SCENE.IGame;
    stage: SCENE.Stage;
    private color;
    private opacity;
    private frame;
    constructor(x?: number, y?: number, width?: number, height?: number, radius?: number, color?: number, opacity?: number);
    get ratio(): number;
    setSize(width?: number, height?: number, radius?: number): void;
}
//# sourceMappingURL=Component.d.ts.map