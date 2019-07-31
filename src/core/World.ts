import { Container } from 'pixi.js'
import { Scene } from '../core'

/**
 * @class
 * @property { Bumber } x - 世界坐标 `x` 值
 * @property { Bumber } y - 世界坐标 `y` 值
 */
export default class World extends Container {
    x: number
    y: number
    scene: Scene

    constructor(scene: Scene) {
        super()
        this.init()
        this.scene = scene
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