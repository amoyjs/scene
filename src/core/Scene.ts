import { Resource, ResourceLoader } from './Resource'

export class Scene {
    public name: string
    public canUpdate: boolean
    public ratio: number
    public ratios: {
        x: number
        y: number
    }
    public stage: SCENE.Stage
    public game: SCENE.IGame
    public route: SCENE.Route
    public Loader = ResourceLoader
    public static addons: Array<() => void> = []

    constructor(name: string) {
        this.name = name
        this.canUpdate = false
        this.ratio = this.game.PIXEL_RATIO.x
        this.ratios = this.game.PIXEL_RATIO
        Scene.addons.map((addon) => addon.call(this))
    }

    public static use(addons: () => void | (() => void)[]) {
        if (Array.isArray(addons)) {
            addons.map((addon) => this.use(addon))
        } else {
            this.addons.push(addons)
        }
    }

    public Load() {
        Resource.Load()
    }

    public onLoading() {}

    public static useLoad(cb: () => void) {
        console.warn(`Scene.useLoad() will be deprecated, please update to version "@amoy/scene@0.4.34" or later and use "Resource.useLoad()" to instead.`)
        Resource.useLoad(cb)
    }

    public switchTo(sceneName: string, query: object = {}) {
        this.route.to(sceneName, query)
    }

    public getQuery(name?: string) {
        if (name) return this.route.query[name]
        return this.route.query
    }

    public create() {}

    public useUpdate() {
        this.canUpdate = true
    }

    public update() {
        if (!this.canUpdate) return false
    }

    public shutdown(cleanUp: boolean = true) {
        this.canUpdate = false
        if (cleanUp) {
            this.stage.shutdown()
        }
    }
}