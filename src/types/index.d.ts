/// <reference types="pixi.js" />
/// <reference types="amoy.js" />

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
        game: AMOY.IGame
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
}


declare module '@amoy/scene' {
    function useScene(game: PIXI.Application, scene: object): void
    const Scene: SCENE.Scene
}