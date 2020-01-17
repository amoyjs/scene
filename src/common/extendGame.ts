import { Scene } from '../core/Scene'
import { Route } from '../core/Route'

export function extendGame({ Loader }, { game }) {
    game.Loader = Loader
    game.resources = Loader.shared.resources

    Scene.prototype.game = game
    Scene.prototype.route = Route.create(game)

    const { UIWidth, UIHeight, width, height } = game.configure

    // 竖屏应用，以宽为准；横屏应用，以高为准
    game.PIXEL_RATIO = UIWidth < UIHeight ? width / UIWidth : height / UIHeight
    game.PIXEL_RATIOS = {
        x: width / UIWidth,
        y: height / UIHeight,
    }
}
