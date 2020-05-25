import * as PIXI from 'pixi.js'
import { Application as Game } from 'pixi.js'
import { Scene } from './Scene'
import { Route } from './Route'
import { Stage } from './Stage'
import { Component } from './Component'
import { Resource, ResourceLoader } from './Resource'
import { createScene } from './createScene'
import defaultConfigure from '../configure'
import { getView } from '../common'
import { extendGame } from '../common/extendGame'
import { event } from '../common/event'

export function createGame(configure: SCENE.IConfigure) {
    const { view } = configure

    configure = Object.assign(defaultConfigure, configure)
    configure.view = view || getView()

    event.emit('beforeCreate', { PIXI, Scene, Resource, ResourceLoader, Stage, Route, Component })

    const game = new Game(configure) as SCENE.IGame

    game.configure = configure

    extendGame(PIXI, { game })

    createScene(game, configure.scenes)

    return game
}
