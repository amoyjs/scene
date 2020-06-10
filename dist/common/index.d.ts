/// <reference types="pixi.js" />
import { SCENE } from '../../types';
export declare function getView(): any;
export declare function remove(display: PIXI.Container): void;
export declare class ScreenSize {
    static get width(): number;
    static get height(): number;
}
export declare const shared: SCENE.Shared;
export declare function getType(target: any): "Text" | "Graphics" | "AnimatedSprite" | "Sprite" | "Container";
export declare function isLandScape(): boolean;
//# sourceMappingURL=index.d.ts.map