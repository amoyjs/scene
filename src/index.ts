export * from './core'
import * as PIXI from 'pixi.js'
import { usesify } from './common'

// export function use(addons: (core: any) => void | ((core: any) => void)[]) {
//     usesify(PIXI)(addons)
// }

export const use = usesify(PIXI)