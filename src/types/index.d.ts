export const useScene: (game: PIXI.Application, scene: object) => void
export class Scene {
    name: string
    game: PIXI.Application
    constructor(name: string)
    getQuery: (name?: string) => object | string
    switchTo: (sceneName: string, query: object) => void
}

export interface IGame extends PIXI.Application{
    world: PIXI.Container
}