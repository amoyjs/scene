import Event from 'eventemitter3'
import { SCENE } from '../../types'

export function eventBUS(LifeCycle: Event) {
    LifeCycle.on('created', ({ game }: SCENE.EVENT_EXPORT) => {
        game.on = function on(event: string | symbol, fn: (...args: any[]) => void, context?: any) {
            LifeCycle.on(event, fn, context)
        }
        game.emit = function emit(event: string | symbol, ...args: any) {
            LifeCycle.emit(event, ...args)
        }
        game.eventNames = function eventNames() {
            return LifeCycle.eventNames()
        }
    })
}
