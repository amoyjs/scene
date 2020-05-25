export * from './core'
import * as PIXI from 'pixi.js'

export { shared, getType } from './common'
export { use } from './common/use'
export { event } from './common/event'

window.PIXI = PIXI
