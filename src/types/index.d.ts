/// <reference types="pixi.js" />

declare const wx: any

declare namespace SCENE {
    interface Loader {
        add(...args: string[]): void
        Load(images: object): void
        LoadFont(families: string[]): void
        onLoaded(closure: (loader: any, resource: any) => void): void
    }

    interface Scene {
        name: string
        game: IGame
        stage: Stage
        Loader: SCENE.Loader
        canUpdate: boolean
        new(name: string): Scene
        Load(cb: () => void): void
        getQuery(name?: string): object | string
        switchTo(sceneName: string, query?: object): void
        getLoad(): object
        useLoad(cb: () => void): void
        create(): void
        useUpdate(): void
        update(): void
        shutdown(cleanUp: boolean): void
    }

    class Stage extends PIXI.Container {
        scene: Scene
        isStage: boolean
        init(): void
        onSceneChange(): void
        shutdown(): void
    }

    interface Route {
        query: any
        to(sceneName: string, query: object): void
    }

    interface IConfigure {
        scenes: object
        UIWidth?: number
        UIHeight?: number
        view?: HTMLCanvasElement
        backgroundColor?: number
        autoStart?: boolean
        sharedTicker?: boolean
        sharedLoader?: boolean
        transparent?: boolean
        autoResize?: boolean
        antialias?: boolean
        preserveDrawingBuffer?: boolean
        resolution?: number
        forceCanvas?: boolean
        clearBeforeRender?: boolean
        roundPixels?: boolean
        forceFXAA?: boolean
        legacy?: boolean
        showFPS?: boolean
        width?: number
        height?: number
        pf?: string
    }

    interface IGame extends PIXI.Application {
        PIXEL_RATIO: {
            x: number
            y: number
        }
        UI_DESIGN_RATIO: number
        world?: PIXI.Container
        resources: any
        Loader: PIXI.Loader
    }
}


declare module '@amoy/scene' {
    const Scene: SCENE.Scene
    function use(addons: (core: any) => void | ((core: any) => void)[]): any
    function useScene(game: PIXI.Application, scene: object): void
    function createGame(configure: SCENE.IConfigure): SCENE.IGame
}