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
        useExternalLoader: boolean
        EVENT_NAMES: {
            LOADED?: 'LOADED'
            LOADING?: 'LOADING'
        }
        on(name: string, cb: () => void): void
        emit(name: string, ...args: Array<any>): void
        eventNames(): string[]
    }

    interface Shared {
        PIXEL_RATIO?: number
        PIXEL_RATIOS?: {
            x: number,
            y: number,
        }
    }

    type EXTENSION = (event: EventEmitter) => void
    type EXTENSIONS = EXTENSION | EXTENSION[]
    type ResourceGetter = { [key: string]: string | string[] } | Function

    interface EVENT_EXPORT {
        PIXI: typeof PIXI,
        Component: Component,
        Resource: Resource,
        configure: IConfigure,
        game: IGame,
    }
}
declare class EventEmitter<EventTypes extends string | symbol = string | symbol> {
    static prefixed: string | boolean;
    eventNames(): Array<EventTypes>;
    listeners(event: EventTypes): Array<EventEmitter.ListenerFn>;
    listenerCount(event: EventTypes): number;
    emit(event: EventTypes, ...args: Array<any>): boolean;
    on(event: EventTypes, fn: EventEmitter.ListenerFn, context?: any): this;
    addListener(event: EventTypes, fn: EventEmitter.ListenerFn, context?: any): this;
    once(event: EventTypes, fn: EventEmitter.ListenerFn, context?: any): this;
    removeListener(event: EventTypes, fn?: EventEmitter.ListenerFn, context?: any, once?: boolean): this;
    off(event: EventTypes, fn?: EventEmitter.ListenerFn, context?: any, once?: boolean): this;
    removeAllListeners(event?: EventTypes): this;
}

declare namespace EventEmitter {
    interface ListenerFn {
        (...args: Array<any>): void;
    }
    interface EventEmitterStatic {
        new <EventTypes extends string | symbol = string | symbol>(): EventEmitter<EventTypes>;
    }
    const EventEmitter: EventEmitterStatic;
}

declare module '@amoy/scene' {
    const event: EventEmitter
    const Scene: SCENE.Scene
    const Route: SCENE.Route
    const shared: SCENE.Shared
    const Resource: SCENE.Resource
    class Component extends SCENE.Component { }
    class SizeComponent extends SCENE.SizeComponent { }
    function use(extension: SCENE.EXTENSIONS): any
    function getGame(): SCENE.IGame
    function getStage(): SCENE.Stage
    function getType(target: any): string
    function createGame(configure: SCENE.IConfigure): SCENE.IGame
}