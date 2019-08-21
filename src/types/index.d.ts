declare const wx: any

declare namespace SCENE {
    interface Loader {
        add: (...args: string[]) => void
        Load: (images: object) => void
        LoadFont: (families: string[]) => void
        onLoaded: (closure: (loader: any, resource: any) => void) => void
    }

    interface IGame extends PIXI.Application {
        world: PIXI.Container
    }

    interface Scene {
        
    }

    interface World {
        x: number
        y: number
        scene: Scene
        isWorld: boolean
        init: () => void
        onSceneChange: () => void
        shutdown: () => void
    }
}

declare module '@amoy/scene' {
    function useScene(game: PIXI.Application, scene: object): void
    class Scene {
        name: string
        game: PIXI.Application
        world: SCENE.World
        constructor(name: string)
        getQuery: (name?: string) => object | string
        switchTo: (sceneName: string, query?: object) => void
        Loader: SCENE.Loader
    }
}