import { Loader } from 'pixi.js'

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

    public to(sceneName: string, query: object = {}) {
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
        this.currentScene.Load()
        Loader.shared.load(() => this.currentScene.create())
        Loader.shared.on('progress', (_, resource) => this.currentScene.onLoading(_.progress, resource.name, resource.url))
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
