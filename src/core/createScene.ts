import { Route } from './Route'
import { event } from '../common/event'

export function createScene(game: any, scenes: object) {
    const keys = Object.keys(scenes).map((key) => key.toLowerCase())
    const values = Object.values(scenes)

    event.emit('created', { game })

    values.map((Scene, index) => new Scene(keys[index]))

    Route.game = game
    Route.to(keys[0])
}
