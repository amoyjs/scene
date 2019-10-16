import { Loader } from 'pixi.js'
import { Scene } from './Scene'

export default class Route {
    public scenes: {}
    public prevSceneName: string
    public currentSceneName: string
    public pendingSceneName: string
    public currentScene: SCENE.Scene
    public instance: Route
    public query: any
    public game: SCENE.IGame
    public static instance: Route

    constructor(game: SCENE.IGame) {
        this.game = game
        this.scenes = {}
        this.query = {}
    }

    public static create(game: any) {
        if (!this.instance) this.instance = new Route(game)
        return this.instance
    }

    public push(scene: SCENE.Scene) {
        this.scenes[scene.name] = scene
    }

    public remove(scene: string | SCENE.Scene) {
        if (typeof scene === 'string') {
            delete this.scenes[scene]
        } else if (scene instanceof Scene) {
            delete this.scenes[scene.name]
        } else {
            console.warn(`需要移除的场景 ${scene} 不存在`)
        }
    }

    public start(sceneName: string = '', query: object = {}) {
        this.to(sceneName, query)
    }

    public to(sceneName: string, query: object) {
        if (this.currentSceneName === sceneName) return false
        if (this.isScene(sceneName)) {
            this.pendingSceneName = sceneName
            this.query = query
        }
    }

    public update() {
        if (this.pendingSceneName) this.setCurrentScene(this.pendingSceneName)
        if (this.currentScene && this.currentScene.canUpdate) {
            this.currentScene.update && this.currentScene.update()
        }
    }

    private setCurrentScene(pendingSceneName: string) {
        if (!this.isScene(pendingSceneName)) {
            console.warn(`场景 ${pendingSceneName} 不存在`)
            return false
        }
        if (this.currentSceneName !== this.pendingSceneName) {
            this.currentScene = this.scenes[pendingSceneName]
            this.cleanStage()
            this.fetchNextScene()
            this.stateUpdate()
            this.onSceneChange()
        }
    }

    private cleanStage() {
        this.game.stage.removeChildren()
    }

    private fetchNextScene() {
        this.game.stage.addChild(this.currentScene.stage)
        if (this.currentScene.Load && typeof this.currentScene.Load === 'function') {
            this.currentScene.Load(() => this.currentScene.create())
        } else {
            this.currentScene.create()
        }
        // @ts-ignore
        if (this.currentScene.onLoading && typeof this.currentScene.onLoading === 'function') {
            Loader.shared.on('progress', (_, resource) => {
                // @ts-ignore
                this.currentScene.onLoading(_.progress, resource.name, resource.url)
            })
        }
        this.pendingSceneName = null
    }

    private stateUpdate() {
        this.prevSceneName = this.currentSceneName
        this.currentSceneName = this.currentScene.name
    }

    private onSceneChange() {
        if (this.prevSceneName) {
            const preScene = this.scenes[this.prevSceneName]
            preScene.shutdown()
            this.game.stage.removeChild(preScene.stage)
        }
        this.currentScene.stage.onSceneChange()
    }

    public getCurrentScene() {
        return this.currentScene
    }

    public getSceneByName(sceneName: string) {
        if (this.scenes[sceneName]) {
            return this.scenes[sceneName]
        } else {
            console.error(`场景 ${sceneName} 不存在`)
        }
    }

    /**
     * 判断是否是合法的「场景」
     */
    isScene(scene: string = '') {
        const hasScene = this.scenes[scene] !== undefined
        return hasScene
    }

    destroy() {
        this.game = null
        this.scenes = {}
        this.pendingSceneName = null
        this.currentSceneName = null
        this.currentScene = null
    }
}
