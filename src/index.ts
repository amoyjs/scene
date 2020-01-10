export * from './core'
import * as PIXI from 'pixi.js'
import { usesify } from './common'

export const use = usesify(PIXI)

window.PIXI = PIXI