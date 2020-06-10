import { Container, Graphics } from 'pixi.js';
import { Stage } from './Stage';
export declare function getGame(): import("./Game").Game;
export declare function getStage(): Stage;
export declare class Component extends Container {
    ratios: {
        x: number;
        y: number;
    };
    game: import("./Game").Game;
    stage: Stage;
    constructor();
    get ratio(): number;
}
export declare class SizeComponent extends Graphics {
    ratios: {
        x: number;
        y: number;
    };
    game: import("./Game").Game;
    stage: Stage;
    private color;
    private opacity;
    private frame;
    constructor(x?: number, y?: number, width?: number, height?: number, radius?: number, color?: number, opacity?: number);
    get ratio(): number;
    setSize(width?: number, height?: number, radius?: number): void;
}
//# sourceMappingURL=Component.d.ts.map