export class FrameCaller {
    constructor() {
        this.frameId = null
        this.stopped = false
    }

    call(handler) {
        this.frameId = null
        this.stopped = false
        const frame = () => {
            if (!this.stopped) {
                this.frameId = requestAnimationFrame(frame)
            }
            handler()
        }
        frame()
    }

    stop() {
        this.stopped = true
        if (this.frameId) {
            cancelAnimationFrame(this.frameId)
        }
    }
}
