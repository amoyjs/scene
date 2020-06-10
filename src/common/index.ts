import { SCENE } from '../../types'

export function getView() {
    // @ts-ignore
    if (typeof canvas !== 'undefined') {
        // @ts-ignore
        return canvas
    } else {
        const view = document.createElement('canvas')
        view.id = 'GAME_VIEW'
        document.body.appendChild(view)
        return view
    }
}

export function remove(display: PIXI.Container) {
    display.children.map((item: PIXI.Container) => remove(item))
    display.removeChildren()
}

export class ScreenSize {
    static get width() {
        return window.innerWidth
    }
    static get height() {
        return window.innerHeight
    }
}

export const shared: SCENE.Shared = {}

export function getType(target: any) {
    if (target['text']) {
        return 'Text'
    } else if (target['fill']) {
        return 'Graphics'
    } else if (target['animationSpeed']) {
        return 'AnimatedSprite'
    } else if (target['isSprite']) {
        return 'Sprite'
    } else {
        return 'Container'
    }
}

export function isLandScape() {
    if (window.orientation === undefined) return true
    const orientation = (+window.orientation / 90) % 2
    return orientation === 1 || orientation === -1
}
