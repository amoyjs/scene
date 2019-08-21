/// <reference types="pixi.js" />

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
        name: string
        game: PIXI.Application
        world: World
        getQuery: (name?: string) => object | string
        switchTo: (sceneName: string, query?: object) => void
        Loader: SCENE.Loader
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
    const Scene: SCENE.Scene
}