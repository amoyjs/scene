import { Scene } from './Scene';
import { Game } from './Game';
export declare class Route {
    static scenes: {};
    static prevSceneName: string;
    static currentSceneName: string;
    static pendingSceneName: string;
    static currentScene: Scene;
    static query: {};
    static history: string[];
    static game: Game;
    static beforeCreated: boolean;
    static isLoaded: boolean;
    static push(scene: Scene): void;
    static to(sceneName: string, query?: object): void;
    static back(query?: object): void;
    static getQuery(name?: string): any;
    static update(): void;
    static setCurrentScene(pendingSceneName: string): void;
    static fetchNextScene(): void;
    static onSceneChange(): void;
    static stateUpdate(): void;
    static isScene(scene?: string): boolean;
}
//# sourceMappingURL=Route.d.ts.map