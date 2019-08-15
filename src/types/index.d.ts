import World from '../core/World'

interface Loader {
    add: (...args: string[]) => void
    Load: (images: object, closure: (name: string, path: string) => void) => void
    onLoaded: (closure: (loader: any, resource: any) => void) => void
}

export interface IGame extends PIXI.Application {
    world: PIXI.Container
}

declare module '@amoy/scene' {
    function useScene(game: PIXI.Application, scene: object): void
    class Scene {
        name: string
        game: PIXI.Application
        world: World
        constructor(name: string)
        getQuery: (name?: string) => object | string
        switchTo: (sceneName: string, query?: object) => void
        Loader: Loader
    }
}