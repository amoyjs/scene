import { Application as Game, Loader } from 'pixi.js'
import { useScene } from './useScene'
import defaultConfigure from '../configure'

export function createGame(configure: SCENE.IConfigure) {
    configure = Object.assign(defaultConfigure, configure)

    const { UIWidth, UIHeight, width, height, scenes } = configure
    const game = new Game(configure) as SCENE.IGame

    game.Loader = Loader
    game.resources = Loader.shared.resources

    if (UIWidth && UIHeight) {
        game.UI_DESIGN_RATIO = width! / UIWidth
        game.PIXEL_RATIO = {
            x: width! / UIWidth,
            y: height! / UIHeight,
        }
    } else {
        console.warn(`must specified both "options.UIWidth" and "options.UIHeight" in createGame(options), or you can not use "game.PIXEL_RATIO" correctly.`)
    }

    useScene(game, scenes)

    return game
}
