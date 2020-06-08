import { Loader, Ticker } from 'pixi.js'
import { Resource } from './Resource'
import { Scene } from './Scene'
import { Stage } from './Stage'

export class Route {
    public static scenes = {}
    public static prevSceneName: string
    public static currentSceneName: string
    public static pendingSceneName: string
    public static currentScene: Scene
    public static query = {}
    public static history: string[] = []
    public static game: SCENE.IGame
    public static beforeCreated: boolean = false
    public static isLoaded: boolean = false

    public static push(scene: Scene) {
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
        this.to(this.history.pop()!, query)
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
        this.game.stage.children.map((stage: Stage) => stage.visible = false)
        // set current scene
        this.currentScene = this.scenes[pendingSceneName]
        this.currentScene.stage.visible = true
        this.fetchNextScene()
        this.stateUpdate()
        this.onSceneChange()
    }

    public static fetchNextScene() {
        const isExist = this.game.stage.children.find((stage: Stage) => stage === this.currentScene.stage)
        if (isExist) {
            this.currentScene.onShow()
        } else {
            const beforeCreate = this.currentScene.beforeCreate()
            const isPromise = beforeCreate instanceof Promise
            if (isPromise) {
                this.beforeCreated = false
                beforeCreate.then(() => {
                    this.beforeCreated = true
                    if (this.isLoaded === true) this.currentScene.create()
                }).catch(() => this.currentScene.create())
            }
            this.currentScene.stage.visible = true
            this.game.stage.addChild(this.currentScene.stage)

            const executable = () => {
                this.isLoaded = true
                this.currentScene.onLoaded(Loader.shared.resources)
                const canCreate = !isPromise || (isPromise && this.beforeCreated)
                if (canCreate) this.currentScene.create()
                this.currentScene.onShow()
            }

            if (this.game.useExternalLoader) {
                this.game.on(this.game.EVENT_NAMES.LOADED, () => executable())
                // @ts-ignore
                this.game.on(this.game.EVENT_NAMES.LOADING, (name: string, percent: number, url: string) => {
                    this.currentScene.onLoading(percent, name, url)
                })
            } else {
                Resource.Load(() => executable())
                Resource.onLoading((percent: number, name: string, url: string) => this.currentScene.onLoading(percent, name, url))
            }

            this.pendingSceneName = ''
        }
    }

    public static onSceneChange() {
        const preScene = this.scenes[this.prevSceneName]
        if (preScene) {
            if (preScene.cleanStage) {
                preScene.destory()
                this.game.stage.removeChild(preScene.stage)
            } else {
                preScene.onHide()
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
