import { Container } from 'pixi.js'

export default class Stage extends Container {
    public isStage: boolean

    constructor(scene: SCENE.Scene) {
        super()
        this.init()
        this.isStage = true
    }

    public init() {
        this.x = 0
        this.y = 0
    }

    public onSceneChange() {
        this.init()
    }

    public shutdown() {
        this.removeChildren()
    }
}