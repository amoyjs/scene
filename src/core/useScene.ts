import { Scene } from './Scene'
import Route from './Route'
import World from './World'

Scene.use(function () {
    this.world = new World(this)
    this.route = Route.create(this.game)
    this.route.push(this)
})

export function useScene(game: any, scenes: object) {
    const keys = Object.keys(scenes)
    const values = Object.values(scenes)
    values.map((scene, index) => {
        Scene.prototype.game = game
        new scene(keys[index])
    })

    const route = Route.create(game)
    route.start(keys[0])
    game.ticker.add(() => route.update())
}