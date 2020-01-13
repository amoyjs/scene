import * as PIXI from 'pixi.js'
import { Scene } from './Scene'
import { Resource, ResourceLoader } from './Resource'
import { Route } from './Route'
import { extensions } from '../common/use'

export function createScene(game: any, scenes: object) {
    const keys = Object.keys(scenes).map((key) => key.toLowerCase())
    const values = Object.values(scenes)
    
    extensions.map((extension) => extension(PIXI, { game, Scene, Resource, ResourceLoader }))
    
    values.map((scene, index) => new scene(keys[index]))
    
    const route = Route.create(game)
    const [name] = keys
    route.to(name)
    game.ticker.add(() => route.update())
}