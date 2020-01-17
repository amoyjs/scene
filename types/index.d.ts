/// <reference types="pixi.js" />

declare const canvas: any

declare namespace SCENE {
    interface Loader {
        add(...args: string[]): void
        Load(images: object): void
        onLoaded(onLoaded: (resources: any) => void): void
    }

    interface Resource {
        resourceGetters: Array<() => void>
        useLoad(cb: () => void): void
        getLoad(): object
        Load(onLoaded?: (resources: any) => void): void
        onLoading(onLoading?: (percent: number, name: string, url: string) => void): void
    }

    interface Scene {
        new(name: string): Scene
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
        onLoading(percent: number, name: string, url: string): void
        Load(): void
        getQuery(name?: string): object | string
        switchTo(sceneName: string, query?: object): void
        create(): void
        useUpdate(): void
        update(): void
        shutdown(cleanUp: boolean): void
    }

    class Stage extends PIXI.Container {
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

    class SizeComponent extends Component {
        new(x?: number, y?: number, width?: number, height?: number, radius?: number, color?: number, opacity?: number): void
        constructor(x?: number, y?: number, width?: number, height?: number, radius?: number, color?: number, opacity?: number)
        setSize(width?: number, height?: number, radius?: number): void
    }

    interface Route {
        query: any
        to(sceneName: string, query?: object): void
        push(scene: SCENE.Scene): void
    }

    interface IConfigure {
        scenes: object
        orientation?: 'landscape' | 'portrait'
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
        PIXEL_RATIO: number
        PIXEL_RATIOS: {
            x: number
            y: number
        }
        resources: any
        Loader: typeof PIXI.Loader
        configure: SCENE.IConfigure
    }

    type EXTENSION = (PIXI: any, options: any) => void
    type EXTENSIONS = EXTENSION | EXTENSION[]
}


declare module '@amoy/scene' {
    const Scene: SCENE.Scene
    const Resource: SCENE.Resource
    class Component extends SCENE.Component { }
    class SizeComponent extends SCENE.SizeComponent { }
    function use(extension: SCENE.EXTENSIONS): any
    function createGame(configure: SCENE.IConfigure): SCENE.IGame
    function createScene(game: PIXI.Application, scenes: Map<string, SCENE.Scene>): void
}