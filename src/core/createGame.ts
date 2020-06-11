import * as PIXI from 'pixi.js'
import { Game } from './Game'
import { getView } from '../common'
import { event } from '../common/event'
import { use } from '../common/use'
// event exports
import { Route } from './Route'
import { Scene } from './Scene'
import { Resource } from './Resource'
import defaultConfigure from '../configure'
// extensions
import extensions from '../extensions'
import { SCENE } from '../../types'

export function createGame(configure: SCENE.IConfigure = { scenes: {} }) {
    const { view } = configure

    configure = Object.assign(defaultConfigure, configure)
    configure.view = view || getView()

    const EVENT_EXPORTS = { PIXI, Route, Scene, Resource, configure }

    event.emit('beforeCreate', EVENT_EXPORTS)

    const game = new Game(configure)

    event.emit('created', { ...EVENT_EXPORTS, game })
    event.emit('sceneCreate', { ...EVENT_EXPORTS, game })
    event.emit('sceneCreated', { ...EVENT_EXPORTS, game })

    return game
}

use(extensions)
