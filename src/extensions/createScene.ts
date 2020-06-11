import Event from 'eventemitter3'
import { Route } from '../core/Route'
import { SCENE } from '../../types'

export function createScene(LifeCycle: Event) {
    LifeCycle.on('sceneCreate', ({ game, configure }: SCENE.EVENT_EXPORT) => {
        const keys = Object.keys(configure.scenes).map((key) => key.toLowerCase())
        const values = Object.values(configure.scenes)

        values.map((Scene, index) => new Scene(keys[index]))

        Route.game = game
        Route.to(keys[0])
    })
}
