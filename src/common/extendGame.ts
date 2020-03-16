import { Scene } from '../core/Scene'
import { shared } from '.'

export function extendGame({ Loader }, { game }) {
    game.Loader = Loader
    game.resources = Loader.shared.resources

    Scene.prototype.game = game

    const { UIWidth, UIHeight } = game.configure
    const width = game.view.width / game.configure.resolution
    const height = game.view.height / game.configure.resolution

    // 竖屏应用，以宽为准；横屏应用，以高为准
    game.PIXEL_RATIO = shared.PIXEL_RATIO = UIWidth < UIHeight ? width / UIWidth : height / UIHeight
    game.PIXEL_RATIOS = shared.PIXEL_RATIOS = {
        x: width / UIWidth,
        y: height / UIHeight,
    }
}
