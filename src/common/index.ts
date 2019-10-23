export * from './compatibleWeChatGame'

export function getView() {
    const view = document.createElement('canvas')
    document.body.appendChild(view)
    return view
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
