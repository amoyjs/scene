import { Loader, Ticker } from 'pixi.js'

export class Route {
    public static scenes = {}
    public static prevSceneName: string
    public static currentSceneName: string
    public static pendingSceneName: string
    public static currentScene: SCENE.Scene
    public static query = {}
    public static history: string[] = []
    public static game: SCENE.IGame

    public static push(scene: SCENE.Scene) {
        this.scenes[scene.name] = scene
    }

    public static to(sceneName: string, query: object = {}) {
        if (!this.isScene(sceneName) || this.currentSceneName === sceneName) return

        this.pendingSceneName = sceneName
        this.query = query
        this.history.push(sceneName)
        this.setCurrentScene(this.pendingSceneName)
    }

    public static back(query: object = {}) {
        if (this.history.length <= 1) return
        this.history.pop()
        this.to(this.history.pop(), query)
    }

    public static getQuery(name?: string) {
        if (name) return this.query[name]
        return this.query
    }

    public static update() {
        if (this.currentScene && this.currentScene.canUpdate) {
            this.currentScene.update()
        }
    }

    public static setCurrentScene(pendingSceneName: string) {
        if (!this.isScene(pendingSceneName)) return console.warn(`Scene ${pendingSceneName} is not exist.`)

        // hide all scenes
        this.game.stage.children.map((stage: SCENE.Stage) => stage.visible = false)
        // set current scene
        this.currentScene = this.scenes[pendingSceneName]
        this.currentScene.stage.visible = true
        this.fetchNextScene()
        this.stateUpdate()
        this.onSceneChange()
    }

    public static fetchNextScene() {
        const isExist = this.game.stage.children.find((stage: SCENE.Stage) => stage === this.currentScene.stage)
        if (!isExist) {
            this.currentScene.stage.visible = true
            this.game.stage.addChild(this.currentScene.stage)
            this.currentScene.Load()
            Loader.shared.load(() => {
                this.currentScene.onLoaded(Loader.shared.resources)
                this.currentScene.autoCreate && this.currentScene.create()
            })
            Loader.shared.on('progress', (_, resource) => this.currentScene.onLoading(_.progress, resource.name, resource.url))
            this.pendingSceneName = null
        }
    }

    public static onSceneChange() {
        if (this.prevSceneName) {
            const preScene = this.scenes[this.prevSceneName]
            if (preScene.cleanStage) {
                preScene.destory()
                this.game.stage.removeChild(preScene.stage)
            }
        }
    }

    public static stateUpdate() {
        this.prevSceneName = this.currentSceneName
        this.currentSceneName = this.currentScene.name
    }

    public static isScene(scene: string = '') {
        return this.scenes[scene] !== undefined
    }
}

Ticker.shared.add(() => Route.update())
