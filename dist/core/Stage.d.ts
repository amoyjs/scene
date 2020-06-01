import { Graphics } from 'pixi.js';
export declare class Stage extends Graphics {
    name: string;
    isStage: boolean;
    constructor(name: string);
    init(): void;
    setSize(): void;
    onSceneChange(): void;
    destory(): void;
}
//# sourceMappingURL=Stage.d.ts.map