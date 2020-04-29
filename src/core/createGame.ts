import * as PIXI from 'pixi.js'
import { Scene } from './Scene'
import { Route } from './Route'
import { Stage } from './Stage'
import { Component } from './Component'
import { Resource, ResourceLoader } from './Resource'
import { createScene } from './createScene'
import defaultConfigure from '../configure'
import { getView, ScreenSize } from '../common'
import { extensions } from '../common/use'
import { extendGame } from '../common/extendGame'
import { SCENE } from 'types'

const { Application: Game } = PIXI

export function createGame(configure: SCENE.IConfigure) {
    const { view } = configure

    configure = Object.assign(defaultConfigure, configure)
    configure.view = view || getView()

    extensions.map((extension) => extension(PIXI, { Scene, Resource, ResourceLoader, Stage, Route, Component }))

    const game = new Game(configure) as SCENE.IGame

    game.configure = configure

    extendGame(PIXI, { game })

    createScene(game, configure.scenes)

    return game
}
