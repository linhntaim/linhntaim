export class AudioPlayer {
    constructor() {
        this.audioContext = null
        this.audioAnalyser = null

        this.audio = new Audio()
        this.audio.addEventListener('ended', this.onEnded.bind(this))
        this.audio.addEventListener('pause', this.onPaused.bind(this))

        this.playlist = []
        this.currentIndex = -1
        this.playing = false
        this.stopped = true
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

    shuffle() {
        const playlist = this.playlist
        this.playlist = []
        while (playlist.length > 1) {
            this.playlist.push(playlist.splice(Math.floor(Math.random() * playlist.length), 1)[0])
        }
        this.playlist.push(playlist.pop())
        return this
    }

    currentSource() {
        return this.currentIndex >= 0 && this.currentIndex < this.playlist.length ?
            this.playlist[this.currentIndex] : null
    }

    start(doneCallback = null, errorCallback = null) {
        this.play(0, doneCallback, errorCallback)
    }

    play(index = 0, doneCallback = null, errorCallback = null) {
        this.currentIndex = index
        const currentSource = this.currentSource()
        if (currentSource) {
            let startOver = false
            if (this.audio.src !== currentSource) {
                this.audio.src = currentSource
                startOver = true
            }
            return this.playCurrent(doneCallback, errorCallback, startOver)
        }

        return false
    }

    next(doneCallback = null, errorCallback = null) {
        const nextIndex = this.currentIndex + 1
        return this.play(nextIndex >= this.playlist.length ? 0 : nextIndex, doneCallback, errorCallback)
    }

    playCurrent(doneCallback = null, errorCallback = null, startOver = false) {
        if (startOver) {
            this.audio.currentTime = 0
        }

        return this.audio.play().then(() => {
            if (!this.audioContext) {
                this.audioContext = new AudioContext()
                this.audioAnalyser = this.audioContext.createAnalyser()
                this.audioAnalyser.fftSize = 128
                this.audioAnalyser.maxDecibels = 0
                this.audioAnalyser.minDecibels = -100
                this.audioContext.createMediaElementSource(this.audio)
                    .connect(this.audioAnalyser)
                this.audioAnalyser.connect(this.audioContext.destination)
            }

            this.playing = true
            this.stopped = false
            doneCallback && doneCallback()
        }).catch(err => {
            errorCallback && errorCallback(err)
        })
    }

    onPaused() {
        this.playing = false
    }

    onEnded() {
        this.next()
    }

    pause() {
        this.audio.pause()
    }

    stop() {
        this.pause()
        this.audio.currentTime = 0
        this.stopped = true
    }
}