import { Graphics } from 'pixi.js'
import { remove, ScreenSize } from '../common'

export class Stage extends Graphics {
    public name: string
    public isStage: boolean

    constructor(name: string) {
        super()
        this.name = name
        this.isStage = true
        this.sortableChildren = true
        this.init()
    }
    
    public init() {
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