import * as PIXI from 'pixi.js'
import { Application as Game } from 'pixi.js'
import { getView } from '../common'
import { event } from '../common/event'
import { use } from '../common/use'
// event exports
import { Resource } from './Resource'
import { Component } from './Component'
import defaultConfigure from '../configure'
// extensions
import extensions from '../extensions'

export function createGame(configure: SCENE.IConfigure = { scenes: {} }) {
    const { view } = configure

    configure = Object.assign(defaultConfigure, configure)
    configure.view = view || getView()

    event.emit('beforeCreate', { PIXI, Component, Resource, configure })

    const game = new Game(configure) as SCENE.IGame

    event.emit('created', { PIXI, Component, Resource, configure, game })
    event.emit('create-scene', { PIXI, Component, Resource, configure, game })

    return game
}

use(extensions)
