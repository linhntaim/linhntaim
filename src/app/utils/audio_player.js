import {browser} from './browser'

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
            if (this.audio.src !== currentSource) {
                this.audio.src = currentSource // can be played at this time caused by autoplay
                this.audio.addEventListener('loadedmetadata', () => {
                    this.playCurrent(doneCallback, errorCallback, true)
                })
                return true
            } else {
                return this.playCurrent(doneCallback, errorCallback, false)
            }
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

        const done = () => {
            if (!this.audioContext && !browser.matched('ie')) {
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
        }
        const error = err => {
            errorCallback && errorCallback(err)
        }

        try {
            const played = this.audio.play()
            if (played) {
                return played.then(done).catch(error)
            }

            if (this.audio.paused) {
                error(null)
                return false
            }
            done()
            return true
        } catch (e) {
            error(e)
            return false
        }
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