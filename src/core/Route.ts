import { Loader } from 'pixi.js'

export class Route {
    public static scenes = {}
    public static prevSceneName: string
    public static currentSceneName: string
    public static pendingSceneName: string
    public static currentScene: SCENE.Scene
    public instance: Route
    public static query = {}
    public static history: string[] = []
    public static game: SCENE.IGame
    public static instance: Route

    constructor(game: SCENE.IGame) {
        Route.game = game
    }

    public static create(game: any) {
        if (!this.instance) this.instance = new Route(game)
        return this.instance
    }

    public static push(scene: SCENE.Scene) {
        Route.scenes[scene.name] = scene
    }

    public static to(sceneName: string, query: object = {}) {
        if (Route.currentSceneName === sceneName) return
        if (Route.isScene(sceneName)) {
            Route.pendingSceneName = sceneName
            Route.query = query
            Route.history.push(sceneName)
        }
    }

    public static back(query: object = {}) {
        if (Route.history.length <= 1) return
        Route.history.pop()
        Route.to(Route.history.pop(), query)
    }

    public static getQuery(name?: string) {
        if (name) return Route.query[name]
        return Route.query
    }

    public to(sceneName: string, query: object = {}) {
        Route.to(sceneName, query)
    }

    public update() {
        if (Route.pendingSceneName) this.setCurrentScene(Route.pendingSceneName)
        if (Route.currentScene && Route.currentScene.canUpdate) {
            Route.currentScene.update && Route.currentScene.update()
        }
    }

    private setCurrentScene(pendingSceneName: string) {
        if (!Route.isScene(pendingSceneName)) {
            console.warn(`场景 ${pendingSceneName} 不存在`)
            return false
        }
        if (Route.currentSceneName !== Route.pendingSceneName) {
            Route.currentScene = Route.scenes[pendingSceneName]
            this.cleanStage()
            this.fetchNextScene()
            this.stateUpdate()
            this.onSceneChange()
        }
    }

    private cleanStage() {
        Route.game.stage.removeChildren()
    }

    private fetchNextScene() {
        Route.game.stage.addChild(Route.currentScene.stage)
        Route.currentScene.Load()
        Loader.shared.load(() => {
            Route.currentScene.onLoaded(Loader.shared.resources)
            Route.currentScene.autoCreate && Route.currentScene.create()
        })
        Loader.shared.on('progress', (_, resource) => Route.currentScene.onLoading(_.progress, resource.name, resource.url))
        Route.pendingSceneName = null
    }

    private stateUpdate() {
        Route.prevSceneName = Route.currentSceneName
        Route.currentSceneName = Route.currentScene.name
    }

    private onSceneChange() {
        if (Route.prevSceneName) {
            const preScene: SCENE.Scene = Route.scenes[Route.prevSceneName]
            preScene.destory()
            Route.game.stage.removeChild(preScene.stage)
        }
        Route.currentScene.stage.onSceneChange()
    }

    public static isScene(scene: string = '') {
        const hasScene = Route.scenes[scene] !== undefined
        return hasScene
    }
}
