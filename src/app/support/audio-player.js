import {take} from '@/app/support/helpers'

export class AudioPlayer
{
    constructor() {
        this.audio = new Audio()
        this.audio.crossOrigin = 'anonymous'
        this.audio.addEventListener('ended', this.next.bind(this))

        this.playlist = []
        this.playlistIndex = -1
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
        this.playlist.sort(() => Math.random() - 0.5)
        return this
    }

    startOver() {
        this.audio.currentTime = 0
        return this
    }

    start() {
        return this.play()
    }

    next() {
        const nextIndex = this.playlistIndex + 1
        return this.play(nextIndex >= this.playlist.length ? 0 : nextIndex)
    }

    prev() {
        const prevIndex = this.playlistIndex - 1
        return this.play(prevIndex < 0 ? this.playlist.length - 1 : prevIndex)
    }

    async play(index = 0) {
        if (index < 0 || index >= this.playlist.length) {
            return false
        }

        this.playlistIndex = index
        const currentSource = this.playlist[this.playlistIndex]
        if (this.audio.src !== currentSource) {
            this.audio.src = currentSource // can be played at this time caused by autoplay
            return await new Promise(resolve => {
                const play = async () => {
                    this.audio.removeEventListener('canplaythrough', play)
                    resolve(await this.startOver().playCurrent())
                }
                this.audio.addEventListener('canplaythrough', play)
            })
        }
        return await this.playCurrent()
    }

    async playCurrent() {
        try {
            await this.audio.play()
            return take(!this.audio.paused, playing => {
                this.playing = playing
                this.stopped = !playing
            })
        }
        catch (e) {
            // eslint-disable-next-line
            console.log(e)
            return false
        }
    }

    pause() {
        this.audio.pause()
        this.playing = false
    }

    stop() {
        this.pause()
        this.audio.currentTime = 0
        this.stopped = true
    }

    createContext() {
        return typeof this.audioContext === 'undefined'
            ? this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
            : this.audioContext
    }

    createAnalyser() {
        return typeof this.audioAnalyser === 'undefined'
            ? this.audioAnalyser = take(this.createContext().createAnalyser(), audioAnalyser => {
                audioAnalyser.fftSize = 128
                audioAnalyser.maxDecibels = 0
                audioAnalyser.minDecibels = -100
                this.audioContext.createMediaElementSource(this.audio).connect(audioAnalyser)
                audioAnalyser.connect(this.audioContext.destination)
            })
            : this.audioAnalyser
    }
}
