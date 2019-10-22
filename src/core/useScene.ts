import { Scene } from './Scene'
import Route from './Route'
import Stage from './Stage'

Scene.use(function () {
    this.stage = new Stage(this.game)
    this.route = Route.create(this.game)
    this.route.push(this)
})

export function useScene(game: any, scenes: object) {
    const keys = Object.keys(scenes).map((key) => key.toLowerCase())
    const values = Object.values(scenes)
    Scene.prototype.game = game
    values.map((scene, index) => new scene(keys[index]))
    const route = Route.create(game)
    route.to(keys[0])
    game.ticker.add(() => route.update())
}