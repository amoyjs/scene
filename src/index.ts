export * from './core'
import * as PIXI from 'pixi.js'
import { usesify, compatibleWeChatGame } from './common'

export const use = usesify(PIXI)

compatibleWeChatGame()

window.PIXI = PIXI