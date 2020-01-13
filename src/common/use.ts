export const extensions: Function[] = []

export function use(extendsions: Function | Array<Function>) {
    if (Array.isArray(extendsions)) {
        extendsions.map((extendsion) => extensions.push(extendsion))
    } else {
        if (typeof extendsions === 'function') {
            extensions.push(extendsions)
        } else {
            console.error(`addon ${extendsions} must be a function`)
        }
    }
}