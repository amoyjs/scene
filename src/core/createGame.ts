import * as PIXI from 'pixi.js'
import { createScene } from './createScene'
import defaultConfigure from '../configure'
import { getView } from '../common'
import { use } from '../common/use'
import { extendGame } from '../common/extendGame'

const { Application: Game } = PIXI

use(extendGame)

export function createGame(configure: SCENE.IConfigure) {
    const { view } = configure

    configure = Object.assign(defaultConfigure, configure)

    configure.view = view || getView()

    const game = new Game(configure) as SCENE.IGame

    game.configure = configure

    createScene(game, configure.scenes)

    return game
}
