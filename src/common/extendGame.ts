import { Scene } from '../core/Scene'
import { shared } from '.'

export function extendGame({ Loader }: any, { game }: any) {
    game.Loader = Loader
    game.resources = Loader.shared.resources

    Scene.prototype.game = game

    const { UIWidth, UIHeight } = game.configure
    const width = game.view.width / game.configure.resolution
    const height = game.view.height / game.configure.resolution

    game.PIXEL_RATIOS = shared.PIXEL_RATIOS = { x: width / UIWidth, y: height / UIHeight }
    // 竖屏应用，以宽为准；横屏应用，以高为准
    Object.defineProperty(game, 'PIXEL_RATIO', {
        get: () => {
            return UIWidth < UIHeight ? game.PIXEL_RATIOS.x : game.PIXEL_RATIOS.y
        },
    })
}
