import { Route } from '../core/Route'

export function createScene(event: any) {
    event.on('create-scene', ({ game, configure }: SCENE.EVENT_EXPORT) => {
        const keys = Object.keys(configure.scenes).map((key) => key.toLowerCase())
        const values = Object.values(configure.scenes)

        values.map((Scene, index) => new Scene(keys[index]))

        Route.game = game
        Route.to(keys[0])
    })
}
