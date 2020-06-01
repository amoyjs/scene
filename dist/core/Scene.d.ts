export declare class Scene {
    name: string;
    canUpdate: boolean;
    ratios: {
        x: number;
        y: number;
    };
    stage: SCENE.Stage;
    game: SCENE.IGame;
    route: SCENE.Route;
    Loader: {
        add: (...args: any) => void;
        Load(images: object, options: any): void;
        onLoaded: (onLoaded?: (resources: any) => void) => void;
    };
    constructor(name: string);
    get ratio(): number;
    Load(): void;
    onLoading(): void;
    onLoaded(): void;
    beforeCreate(): void;
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