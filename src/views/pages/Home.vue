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
</template>

<script>
    import {$ui} from '../../app/utils/ui'
    import {AudioPlayer} from '../../app/utils/audio_player'
    import {APP_URL} from '../../app/config'

    const PLAYLIST = [
        APP_URL + '/sites/sounds/if_you_want_love.mp3',
    ]

    export default {
        name: 'Home',
        data() {
            return {
                audioPlayer: new AudioPlayer().enableAutoplay().add(...PLAYLIST),
            }
        },
        mounted() {
            this.play()
        },
        methods: {
            play() {
                this.audioPlayer.start(
                    () => {
                        const audioContext = new AudioContext()
                        const audioAnalyser = audioContext.createAnalyser()
                        audioContext.createMediaElementSource(this.audioPlayer.getAudio()).connect(audioAnalyser)
                        audioAnalyser.connect(audioContext.destination)
                        audioAnalyser.fftSize = 128
                        audioAnalyser.maxDecibels = 0
                        audioAnalyser.minDecibels = -100

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
                    err => {
                        console.log(err)

                        const $document = $ui(document)
                        const onDocumentClick = () => {
                            $document.off('click', onDocumentClick)

                            this.play()
                        }
                        $document.on('click', onDocumentClick)
                    },
                )
            },
        },
    }
</script>

<style scoped>

</style>