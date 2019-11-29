export class AudioPlayer {
    constructor() {
        this.audio = new Audio()
        this.audio.addEventListener('ended', this.onEnded)
        this.audio.addEventListener('pause', this.onPaused)
        this.playlist = []
        this.currentIndex = -1
        this.playing = false
    }

    getAudio() {
        return this.audio
    }

    enableAutoplay() {
        this.audio.autoplay = true
        return this
    }

    enableLoop() {
        this.audio.loop = true
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
            console.log('playCurrent')
            this.audio.src = currentSource
            this.audio.play().then(() => {
                console.log('play')
                this.playing = true
                doneCallback && doneCallback()
            }).catch(err => {
                errorCallback && errorCallback(err)
            })
        }
    }

    onPaused() {
        console.log('paused')
        this.playing = false
    }

    onEnded() {
        console.log('ended')
        this.playing = false
    }

    pause() {
        this.audio.pause()
    }

    stop() {
        this.pause()
        this.audio.currentTime = 0
    }
}