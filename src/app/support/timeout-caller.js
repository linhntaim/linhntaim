import {HandledCaller} from './handled-caller'

export class TimeoutCaller extends HandledCaller
{
    register(handler, timeout = 200) {
        return super.register(handler, timeout)
    }

    registerRaw(handler, timeout = 200) {
        return setTimeout(handler, timeout)
    }

    stopRaw(handle) {
        clearTimeout(handle)
        return this
    }
}
