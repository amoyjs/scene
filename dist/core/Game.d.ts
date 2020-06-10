import { Application } from 'pixi.js';
import { SCENE } from '../../types';
export declare class Game extends Application {
    PIXEL_RATIO: number;
    PIXEL_RATIOS: {
        x: number;
        y: number;
    };
    resources: any;
    Loader: typeof PIXI.Loader;
    configure: SCENE.IConfigure;
    useExternalLoader: boolean;
    EVENT_NAMES: {
        LOADED?: 'LOADED';
        LOADING?: 'LOADING';
    };
    on: (name: string, cb: () => void) => void;
    emit: (name: string, ...args: any[]) => void;
    eventNames: () => string[];
}
//# sourceMappingURL=Game.d.ts.map