import { Container } from 'pixi.js'

export default class Stage extends Container {
    public x: number
    public y: number
    public scene: SCENE.Scene
    public isWorld: boolean
    public isStage: boolean

    constructor(scene: SCENE.Scene) {
        super()
        this.init()
        this.scene = scene
        this.isWorld = true
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