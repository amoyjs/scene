import { Scene } from './Scene'
import Route from './Route'
import Stage from './Stage'

Scene.use(function () {
    this.stage = new Stage()
})

export function useScene(game: any, scenes: object) {
    const keys = Object.keys(scenes).map((key) => key.toLowerCase())
    const values = Object.values(scenes)
    const route = Route.create(game)

    Scene.prototype.game = game
    Scene.prototype.route = route

    values.map((scene, index) => new scene(keys[index]))

    const [name] = keys
    route.to(name)
    game.ticker.add(() => route.update())
}