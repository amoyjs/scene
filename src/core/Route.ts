import { Scene } from './Scene'

export default class Route {
    public scenes: {}
    public prevSceneName: string | any
    public currentSceneName: string | any
    public pendingSceneName: string | any
    public currentScene: Scene | null
    public instance: Route | null
    public query: any
    public game: any;
    public static instance: Route

    constructor(game: any) {
        this.game = game
        this.scenes = {}
        this.query = {}
        this.prevSceneName = null
        this.currentSceneName = null
        this.pendingSceneName = null
        this.currentScene = null
        this.instance = null
    }

    /**
     * 把场景保存在 `this.scenes` 中
     * @param { Scene } scene - 场景实例
     * @ignore
     */
    public push(scene: Scene) {
        this.scenes[scene.name] = scene
    }

    /**
     * 移除场景
     * @param { Scene | String } scene - 场景实例或场景名
     * @ignore
     */
    public remove(scene: string | Scene) {
        if (typeof scene === 'string') {
            delete this.scenes[scene]
        } else if (scene instanceof Scene) {
            delete this.scenes[scene.name]
        } else {
            console.warn(`需要移除的场景 ${scene} 不存在`)
        }
    }

    /**
     * 启动场景
     * @param { String } sceneName - 场景名
     * @param { Object } query - 场景参数
     * @ignore
     */
    public start(sceneName: string = '', query: object = {}) {
        this.to(sceneName, query)
    }

    /**
     * 切换场景
     * @param { String } sceneName - 场景名
     * @param { Object } query - 场景参数
     * @ignore
     */
    public to(sceneName: string, query: object) {
        if (this.currentSceneName === sceneName) return false
        if (this.isScene(sceneName)) {
            this.pendingSceneName = sceneName
            this.query = query
        }
    }

    /**
     * 场景更新
     * @ignore
     */
    public update() {
        if (this.pendingSceneName) this.setCurrentScene(this.pendingSceneName)
        if (this.currentScene && this.currentScene.canUpdate) {
            this.currentScene.update && this.currentScene.update()
        }
    }

    /**
     * 初始化当前成精
     * @ignore
     */
    private setCurrentScene(pendingSceneName: string) {
        if (!this.isScene(pendingSceneName)) {
            console.warn(`场景 ${pendingSceneName} 不存在`)
            return false
        }
        if (this.currentSceneName !== this.pendingSceneName) {
            this.currentScene = this.scenes[pendingSceneName]
            this.setGameWorld()
            this.cleanStage()
            this.fetchNextScene()
            this.stateUpdate()
            this.onSceneChange()
        }
    }

    private setGameWorld() {
        this.game.world = this.currentScene.world
    }

    private cleanStage() {
        this.game.stage.removeChildren()
    }

    private fetchNextScene() {
        this.game.stage.addChild(this.currentScene.world)
        // @ts-ignore
        if (this.currentScene.Load && typeof this.currentScene.Load === 'function') {
            // @ts-ignore
            this.currentScene.Load(() => {
                this.currentScene.create()
            })
        } else {
            this.currentScene.create()
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
            this.game.stage.removeChild(preScene.world)
        }
        this.currentScene.world.onSceneChange()
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
