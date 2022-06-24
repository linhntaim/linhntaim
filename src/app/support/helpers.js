import {Str} from './str'
import {TimeoutCaller} from './timeout-caller'
import {FrameCaller} from '@/app/support/frame-caller'
import {Browser} from './browser'

export function time() {
    return new Date().getTime()
}

export function only(data, keys) {
    const d = {}
    keys.forEach(key => key in data && (d[key] = data[key]))
    return d
}

export function take(value, callback = null) {
    callback && callback(value)
    return value
}

export function modify(value, callback = null) {
    return callback ? callback(value) : value
}

export function dataGet(data, key, def = null) {
    const keys = key.split('.')
    let k
    while ((k = keys.shift())) {
        if (typeof data === 'object' && k in data) {
            data = data[k]
        }
        else {
            data = null
            break
        }
    }
    return data == null ? def : data
}

export function registerPropertyFactory(object, propertyName, getter) {
    let $prop
    Object.defineProperty(object, propertyName, {
        get() {
            return typeof $prop !== 'undefined' ? $prop : $prop = getter(this)
        },
    })
}

export function registerGlobalPropertyFactory(Class, propertyName, getter) {
    registerPropertyFactory(Class.prototype, propertyName, getter)
}

export const str = new Str()
export const timeoutCaller = new TimeoutCaller()
export const frameCaller = new FrameCaller()
export const browser = new Browser()
