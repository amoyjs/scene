/// <reference types="pixi.js" />

declare const canvas: any

declare namespace SCENE {
    interface Loader {
        add(...args: string[]): void
        Load(images: object, options: any): void
        onLoaded(onLoaded: (resources: any) => void): void
    }

    interface Resource {
        resourceGetters: Array<() => void>
        use(resourceGetter: ResourceGetter): void
        useLoad(resourceGetter: ResourceGetter): void
        getLoad(): object
        optionSetting(options?: any): void
        Load(onLoaded?: (resources: any, asyncs: any[]) => void): Promise<any>
        onLoading(onLoading?: (percent: number, name: string, url: string) => void): void
        onLoaded(onLoaded?: (resources: any) => void): void
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
        Load(): void
        onLoading(percent: number, name: string, url: string): void
        onLoaded(resources: any): void
        getQuery(name?: string): object | string
        switchTo(sceneName: string, query?: object): void
        beforeCreate(): Promise<any>
        create(): void
        useUpdate(): void
        update(): void
        destory(): void
        onShow(): void
        onHide(): void
    }

    class Stage extends PIXI.Container {
        isStage: boolean
        init(): void
        onSceneChange(): void
        destory(): void
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

    class Route {
        // static game: IGame
        // static query: any
        // static history: string[]
        // static to(sceneName: string, query?: object): void
        // static push(scene: SCENE.Scene): void
        // static back(query?: object): void
        // static getQuery(name?: string): string | object
        game: IGame
        query: any
        history: string[]
        to(sceneName: string, query?: object): void
        push(scene: SCENE.Scene): void
        back(query?: object): void
        getQuery(name?: string): string | object
    }

    interface IConfigure {
        scenes: object
        UIWidth?: number
        UIHeight?: number
        // pixi options
        autoStart?: boolean
        width?: number
        height?: number
        view?: HTMLCanvasElement
        transparent?: boolean
        autoDensity?: boolean
        antialias?: boolean
        preserveDrawingBuffer?: boolean
        resolution?: number
        forceCanvas?: boolean
        backgroundColor?: number
        clearBeforeRender?: boolean
        forceFXAA?: boolean
        powerPreference?: string
        sharedTicker?: boolean
        sharedLoader?: boolean
        resizeTo?: Window | HTMLElement
        // pixi deprecated options
        autoResize?: boolean
        roundPixels?: boolean
        legacy?: boolean
        showFPS?: boolean
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

    interface Shared {
        PIXEL_RATIO?: number
        PIXEL_RATIOS?: {
            x: number,
            y: number,
        }
    }

    type EXTENSION = (PIXI: any, options: any) => void
    type EXTENSIONS = EXTENSION | EXTENSION[]
    type ResourceGetter = { [key: string]: string | string[] } | Function
}


declare module '@amoy/scene' {
    const shared: SCENE.Shared
    const Scene: SCENE.Scene
    const Route: SCENE.Route
    const Resource: SCENE.Resource
    class Component extends SCENE.Component { }
    class SizeComponent extends SCENE.SizeComponent { }
    function use(extension: SCENE.EXTENSIONS): any
    function getGame(): SCENE.IGame
    function getStage(): SCENE.Stage
    function getType(target: any): string
    function createGame(configure: SCENE.IConfigure): SCENE.IGame
    function createScene(game: PIXI.Application, scenes: Map<string, SCENE.Scene>): void
}