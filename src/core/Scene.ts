import { Loader } from 'pixi.js'
import World from './World'
import Route from './Route'
import FontLoader from './FontLoader'

export class Scene {
    public name: string
    public canUpdate: boolean
    public world: World
    public game: SCENE.IGame
    public route: Route
    public static resourceGetters: Array<() => void> = []
    public static game: SCENE.IGame
    public static route: Route

    constructor(name: string) {
        this.name = name
        this.canUpdate = false
        this.world = new World(this)
        this.game = Scene.game
        this.route = Scene.route
        this.route.push(this)
    }

    public get Loader() {
        const state = {
            count: 0,
            needLoadFont: false,
        }
        return {
            add: (...args: any) => {
                if (!Loader.shared.resources[args[0]]) Loader.shared.add(...args)
            },
            Load(images: object) {
                Object.keys(images).map((key) => this.add(key, images[key]))
            },
            LoadFont: (families: string[]) => {
                state.needLoadFont = true
                return FontLoader.Load(families)
            },
            onLoaded: (onLoaded: () => void = () => { }) => {
                const done = () => {
                    state.count++
                    if (state.count === 2) onLoaded()
                }
                Loader.shared.load(() => state.needLoadFont ? done() : onLoaded())
                FontLoader.onLoaded(() => done())
            },
        }
    }

    public getLoad() {
        return Scene.resourceGetters.reduce((prev: any, current: any) => {
            prev = Object.assign(prev, current())
            return prev
        }, {})
    }

    public static useLoad(cb: () => void) {
        this.resourceGetters.push(cb)
    }

    /**
     * switchTo - 切换场景
     * @param { String } sceneName - 场景名
     * @param { Object } query - 场景参数
     * 
     * @example
     * 
     * import { Scene } from 'gamekit'
     * class SceneHome extends Scene {
     *     create() {
     *         this.switchTo('sceneTwo', {
     *             extra: 'data',
     *         })
     *     }
     * }
     */
    public switchTo(sceneName: string, query: object = {}) {
        this.route.to(sceneName, query)
    }

    /**
     * getQuery - 获取场景参数
     * @param { String } name - 参数 key 值
     * 
     * @example
     * import { Scene } from 'gamekit'
     * class SceneHome extends Scene {
     *     create() {
     *         this.getQuery() // { extra: 'data' }
     *         this.getQuery('extra') // 'data'
     *     }
     * }
     */
    public getQuery(name?: string) {
        if (name) return this.route.query[name]
        return this.route.query
    }

    /**
     * create
     */
    public create() {
        this.canUpdate = true
    }

    /**
     * update
     */
    public update() {
        if (!this.canUpdate) return false
    }

    public shutdown(cleanUp: boolean = true) {
        this.canUpdate = false
        if (cleanUp) {
            this.world.shutdown()
        }
    }
}