import { SCENE } from '../../types'

export function eventBUS(event: any) {
    event.on('created', ({ game }: SCENE.EVENT_EXPORT) => {
        game.on = function on(...args: any) {
            event.on(...args)
        }
        game.emit = function emit(...args: any) {
            event.emit(...args)
        }
        game.eventNames = function eventNames() {
            return event.eventNames()
        }
    })
}
