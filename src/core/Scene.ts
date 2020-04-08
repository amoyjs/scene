import { Resource, ResourceLoader } from './Resource'
import { Stage } from './Stage'
import { Route } from './Route'

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
    public static addons: Array<() => void> = []

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

    public static use(addons: () => void | Array<() => void>) {
        if (Array.isArray(addons)) {
            addons.map((addon) => this.use(addon))
        } else if (typeof addons === 'function') {
            this.addons.push(addons)
        } else {
            throw Error(`Scene.use() expected a function.`)
        }
    }

    public Load() {
        Resource.Load()
    }

    public onLoading() {}

    public onLoaded() {}

    public static useLoad(cb: () => void) {
        console.warn(`Scene.useLoad() will be deprecated, please update to version "@amoy/scene@0.4.34" or later and use "Resource.useLoad()" to instead.`)
        Resource.useLoad(cb)
    }

    public switchTo(sceneName: string, query: object = {}) {
        Route.to(sceneName, query)
    }

    public getQuery(name?: string) {
        return Route.getQuery(name)
    }

    public create() {}

    public useUpdate() {
        this.canUpdate = true
    }

    public update() {
        if (!this.canUpdate) return false
    }

    public destory() {
        this.canUpdate = false
        this.stage.destory()
    }
}
