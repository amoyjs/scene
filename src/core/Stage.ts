import { Graphics } from 'pixi.js'
import { remove } from '../common'

export default class Stage extends Graphics {
    private game: SCENE.IGame
    public isStage: boolean

    constructor(game: SCENE.IGame) {
        super()
        this.game = game
        this.isStage = true
        this.init()
    }
    
    private init() {
        this.x = 0
        this.y = 0
        this.setSize()
    }

    public setSize() {
        this.beginFill(0xffffff, 0)
        this.drawRect(0, 0, this.game.view.width, this.game.view.height)
        this.endFill()
    }

    public onSceneChange() {
        this.init()
    }

    public shutdown() {
        remove(this)
    }
}