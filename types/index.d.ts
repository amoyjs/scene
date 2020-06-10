/// <reference types="pixi.js" />

import { Game } from '../src/core/Game'
import Event from 'eventemitter3'

declare const canvas: any

export declare namespace SCENE {
    interface IConfigure {
        scenes: object
        UIWidth?: number
        UIHeight?: number
        // pixi options
        autoStart?: boolean
        width?: number
        height?: number
        view?: HTMLCanvasElement
        transparent?: boolean
        autoDensity?: boolean
        antialias?: boolean
        preserveDrawingBuffer?: boolean
        resolution?: number
        forceCanvas?: boolean
        backgroundColor?: number
        clearBeforeRender?: boolean
        forceFXAA?: boolean
        powerPreference?: string
        sharedTicker?: boolean
        sharedLoader?: boolean
        resizeTo?: Window | HTMLElement
        // pixi deprecated options
        autoResize?: boolean
        roundPixels?: boolean
        legacy?: boolean
        showFPS?: boolean
        pf?: string

    }

    interface Shared {
        PIXEL_RATIO?: number
        PIXEL_RATIOS?: {
            x: number,
            y: number,
        }
    }

    type EXTENSION = (event: Event) => void
    type EXTENSIONS = EXTENSION | EXTENSION[]
    type ResourceGetter = { [key: string]: string | string[] } | Function

    interface EVENT_EXPORT {
        PIXI: typeof PIXI,
        configure: IConfigure,
        game: Game,
    }
}