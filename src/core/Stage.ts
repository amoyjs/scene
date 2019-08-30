import { Container } from 'pixi.js'
import { Scene } from '.'

/**
 * @class
 * @property { Bumber } x - 世界坐标 `x` 值
 * @property { Bumber } y - 世界坐标 `y` 值
 */
export default class Stage extends Container {
    public x: number
    public y: number
    public scene: Scene
    public isWorld: boolean
    public isStage: boolean

    constructor(scene: Scene) {
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