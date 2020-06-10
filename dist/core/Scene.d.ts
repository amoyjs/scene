import { Stage } from './Stage';
import { Route } from './Route';
import { Game } from './Game';
export declare class Scene {
    name: string;
    canUpdate: boolean;
    ratios: {
        x: number;
        y: number;
    };
    stage: Stage;
    game: Game;
    route: Route;
    Loader: {
        add: (...args: any) => void;
        Load(images: object, options: any): void;
        onLoaded: (onLoaded?: (resources: any) => void) => void;
    };
    constructor(name: string);
    get ratio(): number;
    Load(): void;
    onLoading(percent: number, name: string, url: string): void;
    onLoaded(resources: any): void;
    beforeCreate(): Promise<any>;
    create(): void;
    onShow(): void;
    onHide(): void;
    switchTo(sceneName: string, query?: object): void;
    getQuery(name?: string): any;
    useUpdate(): void;
    update(): void;
    destory(): void;
}
//# sourceMappingURL=Scene.d.ts.map