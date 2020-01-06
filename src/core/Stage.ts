import { Graphics } from 'pixi.js'
import { remove, ScreenSize } from '../common'

export default class Stage extends Graphics {
    public isStage: boolean

    constructor() {
        super()
        this.isStage = true
        this.sortableChildren = true
        this.init()
    }
    
    private init() {
        this.x = 0
        this.y = 0
        this.setSize()
    }

    public setSize() {
        this.beginFill(0xffffff, 0)
        this.drawRect(0, 0, ScreenSize.width, ScreenSize.height)
        this.endFill()
    }

    public onSceneChange() {
        this.init()
    }

    public shutdown() {
        remove(this)
    }
}