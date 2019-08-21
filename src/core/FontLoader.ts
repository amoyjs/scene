import WebFontLoader from 'webfontloader'

const isWeChat = typeof wx !== 'undefined'

export default class FontLoader {
    private static _onLoaded: () => void = () => { }
    public static onLoaded(onLoaded: () => void = () => { }) {
        this._onLoaded = onLoaded
    }
    public static Load(paths: string[]) {
        if (isWeChat) {
            return paths.map((path) => {
                wx.loadFont(path)
            })
        } else {
            const families = paths.map((path) => {
                const indexDot = path.lastIndexOf(`.`)
                const indexSlash = path.lastIndexOf(`/`)
                return path.slice(indexSlash + 1, indexDot)
            }).filter((item) => !!item)
            WebFontLoader.load({
                custom: {
                    families,
                },
                active: () => this._onLoaded(),
            })
            return ['']
        }
    }
}
