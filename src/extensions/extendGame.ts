import Event from 'eventemitter3'
import { Scene } from '../core/Scene'
import { shared, isLandScape } from '../common'
import { SCENE } from '../../types'

export function extendGame(LifeCycle: Event) {
    LifeCycle.on('created', ({ PIXI, configure, game }: SCENE.EVENT_EXPORT) => {
        game.Loader = PIXI.Loader
        game.resources = PIXI.Loader.shared.resources
        game.EVENT_NAMES = {}
        game.EVENT_NAMES.LOADED = 'LOADED'
        game.EVENT_NAMES.LOADING = 'LOADING'
        configure.view.setAttribute('resolution', `${configure.resolution}`)

        Scene.prototype.game = game

        const { UIWidth, UIHeight } = configure

        game.PIXEL_RATIOS = {
            get x() {
                return game.view.width / configure.resolution / UIWidth
            },
            get y() {
                return game.view.height / configure.resolution / UIHeight
            },
        }
        // 竖屏应用，以宽为准；横屏应用，以高为准
        Object.defineProperty(game, 'PIXEL_RATIO', {
            get() {
                return UIWidth < UIHeight ? game.PIXEL_RATIOS.x : game.PIXEL_RATIOS.y
            },
        })
        shared.PIXEL_RATIOS = game.PIXEL_RATIOS
    })
}
