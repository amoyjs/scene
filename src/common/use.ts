import { event as LifeCycle } from './event'
import { SCENE } from '../../types'

export function use(extendsions: SCENE.EXTENSIONS): void {
    if (Array.isArray(extendsions)) {
        extendsions.map((extendsion) => extendsion(LifeCycle))
    } else {
        if (typeof extendsions === 'function') {
            extendsions(LifeCycle)
        } else {
            console.error(`extendsion ${extendsions} must be a function`)
        }
    }
}
