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
    on: (event: string | symbol, fn: (...args: any[]) => void, context?: any) => void;
    emit: (name: string, ...args: any[]) => void;
    eventNames: () => Array<string | symbol>;
}
//# sourceMappingURL=Game.d.ts.map