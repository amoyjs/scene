export * from './compatibleWeChatGame'


export function getView() {
    if (typeof canvas !== 'undefined') {
        return canvas
    } else {
        const view = document.createElement('canvas')
        document.body.appendChild(view)
        return view
    }
}

export function usesify(target: object) {
    return function use(addons: (core: any) => void | Array<(core: any) => void>) {
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
