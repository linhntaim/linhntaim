export class AudioPlayer {
    constructor() {
        this.audio = new Audio()
        this.playlist = []
        this.currentIndex = -1
    }

    getAudio() {
        return this.audio
    }

    enableAutoplay() {
        this.audio.autoplay = true
        return this
    }

    add(...audioSources) {
        this.playlist.push(...audioSources)
        return this
    }

    start(doneCallback = null, errorCallback = null) {
        this.play(0, doneCallback, errorCallback)
    }

    play(index = 0, doneCallback = null, errorCallback = null) {
        this.currentIndex = index
        return this.playCurrent(doneCallback, errorCallback)
    }

    getCurrentSource() {
        return this.currentIndex >= 0 && this.currentIndex < this.playlist.length ?
            this.playlist[this.currentIndex] : null
    }

    playCurrent(doneCallback = null, errorCallback = null) {
        const currentSource = this.getCurrentSource()
        if (currentSource) {
            this.audio.src = currentSource
            this.audio.play().then(() => {
                doneCallback && doneCallback()
            }).catch(err => {
                errorCallback && errorCallback(err)
            })
        }
    }

}