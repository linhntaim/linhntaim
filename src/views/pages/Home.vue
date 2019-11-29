<template lang="pug">
    #home
        h1 LINHNTAIM
        blockquote
        nav
            .nav-item
                a(href="https://hey.linhntaim.com" target="_blank")
                    span hey
            .nav-item-divider
            .nav-item
                a(href="https://resume.linhntaim.com" target="_blank")
                    span my resume
            .nav-item
                a(href="https://pinkspirit.linhntaim.com" target="_blank")
                    span pinkspirit
            .nav-item-divider
        canvas#canvas
        #player
            img.vinyl-player(:src="appUrl + '/sites/img/vinyl_player.png'")
            img.vinyl(:class="{playing: playing, paused: paused}" :src="appUrl + '/sites/img/vinyl.png'" @click="onVinylClicked")
            img.vinyl-handler(:class="{playing: playing, paused: paused}" :src="appUrl + '/sites/img/vinyl_handler.png'" @click="onVinylHandlerClicked")
            button.vinyl-power(@click="onVinylPowerClicked")
</template>

<script>
    import {$ui} from '../../app/utils/ui'
    import {AudioPlayer} from '../../app/utils/audio_player'
    import {APP_URL} from '../../app/config'

    const PLAYLIST = [
        APP_URL + '/sites/sounds/if_you_want_love.mp3',
        APP_URL + '/sites/sounds/song_for_zula.mp3',
    ]

    export default {
        name: 'Home',
        data() {
            return {
                appUrl: APP_URL,
                audioPlayer: new AudioPlayer().enableAutoplay().enableLoop().add(...PLAYLIST).shuffle(),
            }
        },
        computed: {
            playing() {
                return this.audioPlayer.playing
            },
            paused() {
                return !this.audioPlayer.playing && !this.audioPlayer.stopped
            },
        },
        mounted() {
            this.play()
        },
        methods: {
            play() {
                this.audioPlayer.start(this.playSucceed, this.playFailed)
            },
            playSucceed() {
                const audioAnalyser = this.audioPlayer.audioAnalyser
                const bufferLength = audioAnalyser.frequencyBinCount
                const frequencyData = new Uint8Array(bufferLength)

                const canvas = document.getElementById('canvas')
                const canvasContext = canvas.getContext('2d')
                const canvasWidth = canvas.width
                const canvasHeight = canvas.height

                const barWidth = Math.floor(canvasWidth / bufferLength)

                const renderFrame = () => {
                    requestAnimationFrame(renderFrame)

                    audioAnalyser.getByteFrequencyData(frequencyData)
                    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
                    for (let i = 0; i < bufferLength; i++) {
                        const barHeight = frequencyData[i]
                        canvasContext.fillStyle = '#fff'
                        canvasContext.fillRect(i * barWidth, canvasHeight - barHeight, barWidth - 1, barHeight)
                    }
                }
                renderFrame()
            },
            playFailed(err) {
                console.log(err)

                const $document = $ui(document)
                const onDocumentClick = () => {
                    $document.off('click', onDocumentClick)

                    this.play()
                }
                $document.on('click', onDocumentClick)
            },
            onVinylClicked() {
                if (this.audioPlayer.playing) {
                    this.audioPlayer.pause()
                } else {
                    this.audioPlayer.playCurrent(this.playSucceed, this.playFailed)
                }
            },
            onVinylHandlerClicked() {
                this.audioPlayer.next()
            },
            onVinylPowerClicked() {
                if (!this.audioPlayer.stopped) {
                    this.audioPlayer.stop()
                } else {
                    this.play()
                }
            },
        },
    }
</script>

<style scoped>

</style>