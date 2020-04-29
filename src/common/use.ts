import { SCENE } from 'types'

export const extensions: SCENE.EXTENSION[] = []

export function use(extendsions: SCENE.EXTENSIONS): void {
    if (Array.isArray(extendsions)) {
        extendsions.map((extendsion) => extensions.push(extendsion))
    } else {
        if (typeof extendsions === 'function') {
            extensions.push(extendsions)
        } else {
            console.error(`extendsion ${extendsions} must be a function`)
        }
    }
}
