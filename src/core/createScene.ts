import * as PIXI from 'pixi.js'
import { Scene } from './Scene'
import { Resource, ResourceLoader } from './Resource'
import { Route } from './Route'
import { Stage } from './Stage'
import { extensions } from '../common/use'

export function createScene(game: any, scenes: object) {
    const keys = Object.keys(scenes).map((key) => key.toLowerCase())
    const values = Object.values(scenes)

    extensions.map((extension) => extension(PIXI, { game, Scene, Resource, ResourceLoader, Stage, Route }))

    values.map((Scene, index) => new Scene(keys[index]))

    const route = Route.create(game)
    const [name] = keys
    route.to(name)
    game.ticker.add(() => route.update())
}
