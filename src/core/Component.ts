import { Scene } from './Scene'
import { Container, Graphics } from 'pixi.js'

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


export class SizeComponent extends Graphics {
    public ratio: number
    public ratios: {
        x: number
        y: number
    }
    public game = Scene.prototype.game
    public stage = this.game.stage
    private color = 0xffffff
    private opacity = 0
    private frame = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        radius: 0,
    }
    constructor(x: number = 0, y: number = 0, width: number = window.innerWidth, height: number = window.innerHeight, radius: number = 0, color: number = 0xffffff, opacity: number = 0) {
        super()
        this.stage.addChild(this)
        this.ratio = this.game.PIXEL_RATIO.x
        this.ratios = this.game.PIXEL_RATIO

        this.color = color
        this.opacity = opacity
        this.frame = { x, y, width, height, radius }
        this.beginFill(this.color, this.opacity)
        this.drawRoundedRect(x, y, width, height, radius)
        this.endFill()
    }

    public setSize(width = 0, height = 0, radius = this.frame.radius) {
        this.clear()
        this.frame.width = width
        this.frame.height = height
        this.frame.radius = radius
        const { x, y } = this.frame
        this.beginFill(this.color, this.opacity)
        this.drawRoundedRect(x, y, width, height, radius)
        this.endFill()
    }
}