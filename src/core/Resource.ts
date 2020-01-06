import { Loader } from 'pixi.js'

export const ResourceLoader = {
    add: (...args: any) => {
        if (!Loader.shared.resources[args[0]]) Loader.shared.add(...args)
    },
    Load(images: object) {
        Object.keys(images).map((key) => this.add(key, images[key]))
    },
    onLoaded: (onLoaded: () => void = () => { }) => {
        Loader.shared.load(() => onLoaded())
    },
}

export class Resource {
    public static resourceGetters: Array<() => void> = []

    public static useLoad(cb: () => void) {
        this.resourceGetters.push(cb)
    }

    public static getLoad() {
        return this.resourceGetters.reduce((prev: any, current: any) => Object.assign(prev, current()), {})
    }

    public static Load(onLoaded: (resources: any) => void = () => { }) {
        ResourceLoader.Load(this.getLoad())
        Loader.shared.load(() => onLoaded(Loader.shared.resources))
    }

    public static onLoading(onLoading = (percent: number, name: string, url: string) => {}) {
        Loader.shared.on('progress', (_, resource) => onLoading(_.progress, resource.name, resource.url))
    }
}