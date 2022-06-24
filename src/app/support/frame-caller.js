import {HandledCaller} from './handled-caller'

export class FrameCaller extends HandledCaller
{
    register(handler) {
        return super.register(handler)
    }

    registerRaw(handler) {
        return requestAnimationFrame(handler)
    }

    stopRaw(handle) {
        cancelAnimationFrame(handle)
        return this
    }
}
