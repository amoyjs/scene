export const useScene: (game: PIXI.Application, scene: object) => void
export class Scene {
    name: string
    game: PIXI.Application
    constructor(name: string)
    getQuery: (name?: string) => object | string
    switchTo: (sceneName: string, query?: object) => void
    Loader: Loader
}

interface Loader {
    add: (...args: string[]) => void
    onLoaded: (closure: (loader: any, resource: any) => void) => void
}

export interface IGame extends PIXI.Application {
    world: PIXI.Container
}