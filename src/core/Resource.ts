import { Loader } from 'pixi.js'
import { SCENE } from 'types'

export const ResourceLoader = {
    add: (...args: any) => {
        if (!Loader.shared.resources[args[0]]) Loader.shared.add(...args)
    },
    Load(images: object, options: any) {
        Object.keys(images).map((key) => {
            const isImage = /\.(svg|png|gif|jpe?g)/.test(images[key])
            const isJSON = /\.(json)/.test(images[key]) || Array.isArray(images[key])
            const args = [key, images[key]]
            const setting: any = { ...options }

            if (Array.isArray(images[key])) {
                const image = images[key].find((item: string) => /\.(svg|png|gif|jpe?g)/.test(item))
                const json = images[key].find((item: string) => /\.(json)/.test(item))
                if (image && json) {
                    args[1] = json
                    setting.metadata = {
                        jsonImage: image,
                    }
                }
            }
            if (isImage || isJSON) args.push(setting)
            this.add(...args)
        })
    },
    onLoaded: (onLoaded: (resources: any) => void = () => { }) => {
        Loader.shared.load(() => onLoaded(Loader.shared.resources))
    },
}

export class Resource {
    public static _onLoaded = (resources: any) => {}
    public static state: 'Loading' | 'Loaded' = 'Loading'
    public static options: any
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

    public static optionSetting(options: any) {
        this.options = options
    }

    public static async Load(onLoaded: (resources: any) => void = () => { }) {
        ResourceLoader.Load(this.getLoad(), this.options)
        this.resourceGetters = []
        this.state = 'Loading'
        return new Promise((resolve) => Loader.shared.load(() => {
            this.state = 'Loaded'
            resolve(Loader.shared.resources)
            onLoaded(Loader.shared.resources)
            this._onLoaded(Loader.shared.resources)
        }))
    }

    public static onLoading(onLoading = (percent: number, name: string, url: string) => {}) {
        Loader.shared.on('progress', (_, resource) => onLoading(_.progress, resource.name, resource.url))
    }

    public static onLoaded(onLoaded = (resources: any) => { }) {
        this._onLoaded = onLoaded
    }
}
