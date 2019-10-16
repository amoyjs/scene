import { Renderer } from 'pixi.js'
import { install } from '@pixi/unsafe-eval'

export function compatibleWeChatGame() {
    if (typeof eval !== 'function') install(PIXI)
    // @ts-ignore
    Renderer.create = (options: object) => {
        return new Renderer(options)
    }
}