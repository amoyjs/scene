import { Scene } from './Scene'
import { Container } from 'pixi.js'

export class Component extends Container {
    public ratio: number
    public ratios: {
        x: number
        y: number
    }
    public game = Scene.prototype.game
    public stage = this.game.stage
    constructor() {
        super()
        this.stage.addChild(this)
        this.ratio = this.game.PIXEL_RATIO.x
        this.ratios = this.game.PIXEL_RATIO
    }
}
