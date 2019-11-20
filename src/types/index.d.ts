/// <reference types="pixi.js" />

declare const wx: any
declare const canvas: any
declare module '@pixi/unsafe-eval'

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
        ratio: number
        ratios: {
            x: number
            y: number
        }
        Loader: SCENE.Loader
        canUpdate: boolean
        new(name: string): Scene
        onLoading(percent: number, name: string, url: string): void
        Load(): void
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

    class Component extends PIXI.Container {
        game: IGame
        stage: Stage
        ratio: number
        ratios: {
            x: number
            y: number
        }
    }

    interface Route {
        query: any
        to(sceneName: string, query?: object): void
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
        Loader: typeof PIXI.Loader
    }

    type ADDON = (core: any) => void | Array<(core: any) => void>
}


declare module '@amoy/scene' {
    const Scene: SCENE.Scene
    class Component extends SCENE.Component { }
    function use(addons: SCENE.ADDON): any
    function useScene(game: PIXI.Application, scene: object): void
    function createGame(configure: SCENE.IConfigure): SCENE.IGame
}