import { Container, Graphics } from 'pixi.js'
import { Scene } from './Scene'
import { Route } from './Route'

export function getGame() {
    return Scene.prototype.game
}

export function getStage(): SCENE.Stage {
    return getGame().stage.children.find((stage: SCENE.Stage) => stage.name === Route.currentScene.name) as SCENE.Stage
}

export class Component extends Container {
    public ratio: number
    public ratios: {
        x: number,
        y: number,
    }
    public game = getGame()
    public stage = getStage()
    constructor() {
        super()
        this.stage.addChild(this)
        this.ratio = this.game.PIXEL_RATIO
        this.ratios = this.game.PIXEL_RATIOS
    }
}

export class SizeComponent extends Graphics {
    public ratio: number
    public ratios: {
        x: number,
        y: number,
    }
    public game = getGame()
    public stage = getStage()
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
        this.ratio = this.game.PIXEL_RATIO
        this.ratios = this.game.PIXEL_RATIOS

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
