import { Loader } from 'pixi.js'

const SceneLoader = {
    add: (...args: any) => {
        if (!Loader.shared.resources[args[0]]) Loader.shared.add(...args)
    },
    Load(images: object) {
        Object.keys(images).map((key) => this.add(key, images[key]))
    },
    onLoaded: (onLoaded: () => void = () => { }) => {
        Loader.shared.load(() => onLoaded())
    },
}

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
    public static addons: Array<() => void> = []
    public static resourceGetters: Array<() => void> = []

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

    public get Loader() {
        return SceneLoader
    }

    public static Load(onLoading = (percent: number, name: string, url: string) => {}) {
        SceneLoader.Load(this.getLoad())
        Loader.shared.on('progress', (_, resource) => onLoading(_.progress, resource.name, resource.url))
    }

    public Load() {
        SceneLoader.Load(this.getLoad())
    }

    public static getLoad() {
        return Scene.resourceGetters.reduce((prev: any, current: any) => {
            prev = Object.assign(prev, current())
            return prev
        }, {})
    }

    public getLoad() {
        return Scene.getLoad()
    }

    public static useLoad(cb: () => void) {
        this.resourceGetters.push(cb)
    }

    public switchTo(sceneName: string, query: object = {}) {
        this.route.to(sceneName, query)
    }

    public getQuery(name?: string) {
        if (name) return this.route.query[name]
        return this.route.query
    }

    public create() { }

    public onLoading() { }

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