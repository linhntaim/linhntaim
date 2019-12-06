<template lang="pug">
    .home
        .background
        .content
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
                .nav-item
                    a(href="https://dev.linhntaim.com" target="_blank")
                        span dev
                .nav-item-divider
            canvas
            .player
                img.vinyl-turntable(:src="appUrl + '/sites/img/vinyl_player.png'")
                img.vinyl(:class="{playing: playing, paused: paused}" :src="appUrl + '/sites/img/vinyl.png'" @click="onVinylClicked")
                img.vinyl-handler(:class="{playing: playing, paused: paused}" :src="appUrl + '/sites/img/vinyl_handler.png'" @click="onVinylHandlerClicked")
                img.vinyl-led.grey(:class="{playing: playing, paused: paused}" :src="appUrl + '/sites/img/vinyl_led_grey.png'")
                img.vinyl-led.red(v-if="playing" :class="{playing: playing, paused: paused}" :src="appUrl + '/sites/img/vinyl_led_red.png'")
                img.vinyl-led.yellow(v-if="paused" :class="{playing: playing, paused: paused}" :src="appUrl + '/sites/img/vinyl_led_yellow.png'")
                img.vinyl-led.green(v-if="stopped" :class="{playing: playing, paused: paused}" :src="appUrl + '/sites/img/vinyl_led_green.png'")
                button.vinyl-power(@click="onVinylPowerClicked")
</template>

<script>
    import {$ui} from '../../app/utils/ui'
    import {AudioPlayer} from '../../app/utils/audio_player'
    import {APP_URL} from '../../app/config'
    import {timeoutCaller} from '../../app/utils/timeout_caller'
    import {FrameCaller} from '../../app/utils/frame_caller'
    import {browser} from '../../app/utils/browser'

    const PLAYLIST = [
        APP_URL + '/sites/sounds/if_you_want_love.mp3',
        APP_URL + '/sites/sounds/song_for_zula.mp3',
        APP_URL + '/sites/sounds/time.mp3',
        APP_URL + '/sites/sounds/a_rush_of_blood_to_the_head.mp3',
        APP_URL + '/sites/sounds/heal.mp3',
        APP_URL + '/sites/sounds/the_light_behind_your_eyes.mp3',
        APP_URL + '/sites/sounds/every_breaking_wave.mp3',
        APP_URL + '/sites/sounds/another_love.mp3',
        APP_URL + '/sites/sounds/there_are_worse_games_to_play.mp3',
        APP_URL + '/sites/sounds/yellow_flicker_beat.mp3',
    ]

    export default {
        name: 'Home',
        head: {
            meta: [],
        },
        data() {
            return {
                appUrl: APP_URL,
                audioPlayer: new AudioPlayer().enableAutoplay().add(...PLAYLIST).shuffle(),

                frameCaller: new FrameCaller(),
            }
        },
        computed: {
            playing() {
                return this.audioPlayer.playing
            },
            paused() {
                return !this.audioPlayer.playing && !this.audioPlayer.stopped
            },
            stopped() {
                return !this.audioPlayer.playing && this.audioPlayer.stopped
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
                if (!browser.matched('ie')) {
                    const audioAnalyser = this.audioPlayer.audioAnalyser
                    const bufferLength = audioAnalyser.frequencyBinCount
                    const frequencyData = new Uint8Array(bufferLength)

                    const canvas = document.getElementsByTagName('canvas')[0]
                    const canvasContext = canvas.getContext('2d')
                    const canvasWidth = canvas.width
                    const canvasHeight = canvas.height

                    const barWidth = Math.floor(canvasWidth / bufferLength)

                    this.frameCaller.call(() => {
                        audioAnalyser.getByteFrequencyData(frequencyData)
                        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
                        for (let i = 0; i < bufferLength; i++) {
                            const barHeight = frequencyData[i]
                            canvasContext.fillStyle = '#fff'
                            canvasContext.fillRect(i * barWidth, canvasHeight - barHeight, barWidth - 1, barHeight)
                        }
                    })
                } else this.offCanvas()
            },
            playFailed() {
                const $document = $ui(document)
                const onDocumentClick = () => {
                    $document.off('click', onDocumentClick)

                    this.play()
                }

                $document.on('click', onDocumentClick)
                this.offCanvas()
            },
            offCanvas() {
                const canvas = document.getElementsByTagName('canvas')[0]
                const canvasContext = canvas.getContext('2d')
                const canvasWidth = canvas.width
                const canvasHeight = canvas.height
                canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
                for (let i = 0; i < 60; i++) {
                    canvasContext.fillStyle = '#fff'
                    canvasContext.fillRect(i * 4, 0, 3, canvasHeight)
                }
            },
            onVinylClicked() {
                if (this.playing) {
                    this.audioPlayer.pause()
                    this.frameCaller.stop()
                } else {
                    this.audioPlayer.playCurrent(this.playSucceed, this.playFailed)
                }
            },
            onVinylHandlerClicked($event) {
                if (!this.playing) {
                    return
                }
                $event.target.classList.add('next')
                timeoutCaller.register(() => {
                    this.audioPlayer.stop()
                    this.audioPlayer.next()
                    $event.target.classList.remove('next')
                }, 1000)
            },
            onVinylPowerClicked() {
                if (!this.stopped) {
                    this.audioPlayer.stop()
                    this.frameCaller.stop()
                    this.offCanvas()
                } else {
                    this.play()
                }
            },
        },
    }
</script>