import { Loader } from 'pixi.js'

export const ResourceLoader = {
    add: (...args: any) => {
        if (!Loader.shared.resources[args[0]]) Loader.shared.add(...args)
    },
    Load(images: object) {
        Object.keys(images).map((key) => this.add(key, images[key]))
    },
    onLoaded: (onLoaded: (resources: any) => void = () => { }) => {
        Loader.shared.load(() => onLoaded(Loader.shared.resources))
    },
}

export class Resource {
    public static resourceGetters: SCENE.ResourceGetter[] = []

    public static useLoad(resourceGetter: SCENE.ResourceGetter) {
        this.resourceGetters.push(resourceGetter)
    }

    public static getLoad() {
        const fromObject = this.resourceGetters.filter((getter) => typeof getter === 'object').reduce((prev: any, current: any) => Object.assign(prev, current), {})
        const fromClosure = this.resourceGetters.filter((getter) => typeof getter === 'function').reduce((prev: any, current: any) => Object.assign(prev, current()), {})
        return Object.assign(fromObject, fromClosure)
    }

    public static Load(onLoaded: (resources: any) => void = () => { }) {
        ResourceLoader.Load(this.getLoad())
        Loader.shared.load(() => onLoaded(Loader.shared.resources))
    }

    public static onLoading(onLoading = (percent: number, name: string, url: string) => {}) {
        Loader.shared.on('progress', (_, resource) => onLoading(_.progress, resource.name, resource.url))
    }
}
