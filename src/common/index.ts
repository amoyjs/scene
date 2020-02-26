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

export const ScreenSize = {
    width: window.screen.width,
    height: window.screen.height,
}

export const shared: SCENE.Shared = {}
