import { Resource, ResourceLoader } from './Resource'
import { Stage } from './Stage'
import { Route } from './Route'
import { SCENE } from 'types'

export class Scene {
    public name: string
    public canUpdate: boolean
    public ratios: {
        x: number,
        y: number,
    }
    public stage: SCENE.Stage
    public game: SCENE.IGame
    public route: SCENE.Route
    public Loader = ResourceLoader
    public autoCreate = true

    constructor(name: string) {
        this.name = name
        this.canUpdate = false
        this.ratios = this.game.PIXEL_RATIOS
        this.stage = new Stage(name)
        // @ts-ignore
        Route.push(this)
    }

    public get ratio() {
        return this.game.PIXEL_RATIO
    }

    public Load() {
        Resource.Load()
    }

    public onLoading() {}

    public onLoaded() { }

    public create() { }

    public onShow() { }
    public onHide() { }

    public switchTo(sceneName: string, query: object = {}) {
        Route.to(sceneName, query)
    }

    public getQuery(name?: string) {
        return Route.getQuery(name)
    }

    public useUpdate() {
        this.canUpdate = true
    }

    public update() {
        if (!this.canUpdate) return
    }

    public destory() {
        this.canUpdate = false
        this.stage.destory()
    }
}
