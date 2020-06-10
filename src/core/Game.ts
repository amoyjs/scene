import { Application } from 'pixi.js'
import { SCENE } from '../../types'

export class Game extends Application {
    public PIXEL_RATIO: number
    public PIXEL_RATIOS: {
        x: number
        y: number,
    }
    public resources: any
    public Loader: typeof PIXI.Loader
    public configure: SCENE.IConfigure
    public useExternalLoader: boolean
    public EVENT_NAMES: {
        LOADED?: 'LOADED'
        LOADING?: 'LOADING',
    }
    public on: (name: string, cb: () => void) => void
    public emit: (name: string, ...args: any[]) => void
    public eventNames: () => string[]
}
