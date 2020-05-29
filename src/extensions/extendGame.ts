import { Scene } from '../core/Scene'
import { shared } from '../common'

export function extendGame(event: any) {
    event.on('created', ({ PIXI, configure, game }: SCENE.EVENT_EXPORT) => {
        game.Loader = PIXI.Loader
        game.resources = PIXI.Loader.shared.resources

        Scene.prototype.game = game

        const { UIWidth, UIHeight } = configure
        const width = game.view.width / configure.resolution!
        const height = game.view.height / configure.resolution!

        game.PIXEL_RATIOS = shared.PIXEL_RATIOS = { x: width / UIWidth!, y: height / UIHeight! }
        // 竖屏应用，以宽为准；横屏应用，以高为准
        Object.defineProperty(game, 'PIXEL_RATIO', {
            get: () => {
                return UIWidth! < UIHeight! ? game.PIXEL_RATIOS.x : game.PIXEL_RATIOS.y
            },
        })
    })
}
