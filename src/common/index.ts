export function getView() {
    if (typeof canvas !== 'undefined') {
        return canvas
    } else {
        const view = document.createElement('canvas')
        document.body.appendChild(view)
        return view
    }
}

export function createExtend(store: any[]) {
    return function extend(extendsions: () => void | Array<() => void>) {
        if (Array.isArray(extendsions)) {
            extendsions.map((extendsion) => store.push(extendsion))
        } else {
            if (typeof extendsions === 'function') {
                store.push(extendsions)
            } else {
                console.error(`addon ${extendsions} must be a function`)
            }
        }
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
