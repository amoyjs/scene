import { Loader } from 'pixi.js'

export const ResourceLoader = {
    add: (...args: any) => {
        if (!Loader.shared.resources[args[0]]) Loader.shared.add(...args)
    },
    Load(images: object, options: any) {
        Object.keys(images).map((key) => this.add(key, images[key], options))
    },
    onLoaded: (onLoaded: (resources: any) => void = () => { }) => {
        Loader.shared.load(() => onLoaded(Loader.shared.resources))
    },
}

export class Resource {
    public static _onAsyncLoaded = (asyncs: any[]) => {}
    public static _onLoaded = (resources: any) => {}
    public static options: any
    public static asyncs: Array<Promise<any>> = []
    public static resourceGetters: SCENE.ResourceGetter[] = []

    public static use(resourceGetter: SCENE.ResourceGetter) {
        this.resourceGetters.push(resourceGetter)
    }

    public static useLoad(resourceGetter: SCENE.ResourceGetter) {
        this.resourceGetters.push(resourceGetter)
        console.warn(`'Resource.useLoad()' will be deprecated in next major version, use 'Resource.use()' to instead.`)
    }

    public static getLoad() {
        const fromObject = this.resourceGetters.filter((getter) => typeof getter === 'object').reduce((prev: any, current: any) => Object.assign(prev, current), {})
        const fromClosure = this.resourceGetters.filter((getter) => typeof getter === 'function').reduce((prev: any, current: any) => Object.assign(prev, current()), {})
        return Object.assign(fromObject, fromClosure)
    }

    public static useAsync(promise: Promise<any> | Array<Promise<any>>) {
        if (Array.isArray(promise)) {
            promise.map((item) => this.asyncs.push(item))
        } else {
            this.asyncs.push(promise)
        }
    }

    public static optionSetting(options: any) {
        this.options = options
    }

    public static async Load(onLoaded: (resources: any, asyncs: any[]) => void = () => { }) {
        ResourceLoader.Load(this.getLoad(), this.options)
        this.resourceGetters = []
        const asyncs = await Promise.all(this.asyncs)
        this._onAsyncLoaded(asyncs)
        return new Promise((resolve) => Loader.shared.load(() => {
            resolve(Loader.shared.resources)
            onLoaded(Loader.shared.resources, asyncs)
            this._onLoaded(Loader.shared.resources)
        }))
    }

    public static onAsyncLoaded(onAsyncLoaded = (asyncs: any[]) => {}) {
        this._onAsyncLoaded = onAsyncLoaded
    }

    public static onLoading(onLoading = (percent: number, name: string, url: string) => {}) {
        Loader.shared.on('progress', (_, resource) => onLoading(_.progress, resource.name, resource.url))
    }

    public static onLoaded(onLoaded = (resources: any) => { }) {
        this._onLoaded = onLoaded
    }
}
