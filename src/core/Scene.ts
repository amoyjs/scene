import { Loader } from 'pixi.js'
import World from './World'
import Route from './Route'
import { IGame } from '../types'

export class Scene {
    name: string
    canUpdate: boolean
    world: World
    game: IGame
    route: Route
    static game: IGame
    static route: Route

    constructor(name: string) {
        this.name = name
        this.canUpdate = false
        this.world = new World(this)
        this.game = Scene.game
        this.route = Scene.route
        this.route.push(this)
    }

    public get Loader() {
        return {
            add: (...args: any) => {
                if (!Loader.shared.resources[args[0]]) {
                    Loader.shared.add(...args)
                }
            },
            onLoaded: (onLoaded: () => void = () => { }) => {
                Loader.shared.load(onLoaded)
            },
            Load: (images: object, closure: (name: string, path: string) => void) => {
                Object.keys(images).map((key) => closure(key, images[key]))
            },
        }
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