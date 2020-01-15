import { Scene } from '../core/Scene'
import { Route } from '../core/Route'

export function extendGame({ Loader }, { game }) {
    game.Loader = Loader
    game.resources = Loader.shared.resources

    Scene.prototype.game = game
    Scene.prototype.route = Route.create(game)

    const { UIWidth, UIHeight, width, height } = game.configure

    if (UIWidth && UIHeight) {
        game.UI_DESIGN_RATIO = width! / UIWidth
        game.PIXEL_RATIO = {
            x: width! / UIWidth,
            y: height! / UIHeight,
        }
    } else {
        console.warn(`must specified both "options.UIWidth" and "options.UIHeight" in createGame(options), or you can not use "game.PIXEL_RATIO" correctly.`)
    }
}
