import { event } from './event'
import { SCENE } from '../../types'

export function use(extendsions: SCENE.EXTENSIONS): void {
    if (Array.isArray(extendsions)) {
        extendsions.map((extendsion) => extendsion(event))
    } else {
        if (typeof extendsions === 'function') {
            extendsions(event)
        } else {
            console.error(`extendsion ${extendsions} must be a function`)
        }
    }
}
