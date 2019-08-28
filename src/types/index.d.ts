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
        UI_DESIGN_RATIO: number
    }

    interface Scene {
        name: string
        game: IGame
        world: World
        Loader: SCENE.Loader
        new(name: string): Scene
        getQuery: (name?: string) => object | string
        switchTo: (sceneName: string, query?: object) => void
        getLoad: () => object
        useLoad: (cb: () => void) => void
        create: () => void
        update: () => void
        shutdown: (cleanUp: boolean)  => void
    }

    interface World {
        x: number
        y: number
        scene: Scene
        isWorld: boolean
        constructor(): void
        init(): void
        onSceneChange(): void
        shutdown(): void
    }
}


declare module '@amoy/scene' {
    function useScene(game: PIXI.Application, scene: object): void
    const Scene: SCENE.Scene
}