import {take} from './helpers'

export class HandledCaller
{
    constructor() {
        this.handles = []
    }

    register(handler, ...params) {
        return take(this.registerRaw(handler, ...params), handle => this.handles.push(handle))
    }

    // eslint-disable-next-line no-unused-vars
    registerRaw(handler, ...params) {
        return null
    }

    stop(handle = null) {
        if (handle == null) {
            return this.stopLast()
        }

        const index = this.handles.indexOf(handle)
        if (index !== -1) {
            this.stopRaw(handle)
            this.handles.splice(index, 1)
        }
        return this
    }

    stopLast() {
        const handle = this.handles.pop()
        if (handle) {
            this.stopRaw(handle)
        }
        return this
    }

    stopAll() {
        while (this.handles.length > 0) {
            this.stopRaw(this.handles.shift())
        }
        return this
    }

    // eslint-disable-next-line no-unused-vars
    stopRaw(handle) {
        return this
    }
}
