import * as PIXI from 'pixi.js'
import { Game } from './Game'
import { getView } from '../common'
import { event } from '../common/event'
import { use } from '../common/use'
// event exports
import { Resource } from './Resource'
import defaultConfigure from '../configure'
// extensions
import extensions from '../extensions'
import { SCENE } from '../../types'

export function createGame(configure: SCENE.IConfigure = { scenes: {} }) {
    const { view } = configure

    configure = Object.assign(defaultConfigure, configure)
    configure.view = view || getView()

    event.emit('beforeCreate', { PIXI, Resource, configure })

    const game = new Game(configure)

    event.emit('created', { PIXI, Resource, configure, game })
    event.emit('create-scene', { PIXI, Resource, configure, game })

    return game
}

use(extensions)
