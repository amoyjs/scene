export * from './compatibleWeChatGame'
import { Scene } from '../core/Scene'
import Route from '../core/Route'

export function getView() {
    if (typeof canvas !== 'undefined') {
        return canvas
    } else {
        const view = document.createElement('canvas')
        document.body.appendChild(view)
        return view
    }
}

export function usesify(target: object): SCENE.ADDON {
    return function use(addons: SCENE.ADDON) {
        if (Array.isArray(addons)) {
            addons.map((addon) => use(addon))
        } else {
            if (typeof addons === 'function') {
                addons(target)
            } else {
                console.error(`addon ${addons} must be a function`)
            }
        }
    }
}

export function remove(display: PIXI.Container) {
    display.children.map((item: PIXI.Container) => remove(item))
    display.removeChildren()
}

export function getGame() {
    return Scene.prototype.game
}

export function getStage() {
    return getGame().stage.children.find((stage: SCENE.Stage) => stage.name === Route.create(getGame()).currentScene.name)
}

export const ScreenSize = {
    width: window.innerWidth,
    height: window.innerHeight,
}