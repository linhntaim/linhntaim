<template lang="pug">
.home
    .background(style="background-image: url('/assets/img/cover.jpg')")
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
            img.vinyl-turntable(:src="appUrl + '/assets/img/vinyl_player.png'")
            img.vinyl(:class="{playing: playing, paused: paused}" :src="appUrl + '/assets/img/vinyl.png'" @click="onVinylClicked")
            img.vinyl-handler(:class="{playing: playing, paused: paused}" :src="appUrl + '/assets/img/vinyl_handler.png'" @click="onVinylHandlerClicked")
            img.vinyl-led.grey(:class="{playing: playing, paused: paused}" :src="appUrl + '/assets/img/vinyl_led_grey.png'")
            img.vinyl-led.red(v-if="stopped" :class="{playing: playing, paused: paused}" :src="appUrl + '/assets/img/vinyl_led_red.png'")
            img.vinyl-led.yellow(v-if="paused" :class="{playing: playing, paused: paused}" :src="appUrl + '/assets/img/vinyl_led_yellow.png'")
            img.vinyl-led.green(v-if="playing" :class="{playing: playing, paused: paused}" :src="appUrl + '/assets/img/vinyl_led_green.png'")
            button.vinyl-power(@click="onVinylPowerClicked")
</template>

<script>
import {browser, timeoutCaller} from '@/app/support/helpers'
import {AudioPlayer} from '@/app/support/audio-player'
import {FrameCaller} from '@/app/support/frame-caller'
import axios from 'axios'

export default {
    // eslint-disable-next-line
    name: 'Welcome',
    head: {
        meta: [],
    },
    data() {
        return {
            appUrl: this.$config.app.url,
            frameCaller: new FrameCaller(),
            audioPlayer: new AudioPlayer().enableAutoplay(),
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
        this.load()
    },
    methods: {
        load() {
            axios.get(`${this.appUrl}/assets/sounds/manifest.json`).then(response => {
                this.audioPlayer
                    .add(...response.data.sounds.map(sound => `${this.appUrl}/assets/sounds/${sound}`))
                    .shuffle()
                this.play()
            })
        },
        async play() {
            if (await this.audioPlayer.start()) {
                this.playSucceed()
            }
            else {
                this.playFailed()
            }
        },
        playSucceed() {
            if ((() => {
                if (browser.matched('ie')) { // not work with ie
                    return false
                }
                if (browser.getOs().toLowerCase() === 'ios') { // issued with iOS >= 13
                    const matches = navigator.userAgent.match(/iphone os (\d+)_(\d+)/i)
                    if (matches) {
                        const version = {
                            major: parseInt(matches[1]),
                            minor: parseInt(matches[2]),
                        }
                        if (version.major >= 13) {
                            return false
                        }
                    }
                }
                return true
            })()) {
                const audioAnalyser = this.audioPlayer.createAnalyser()
                const bufferLength = audioAnalyser.frequencyBinCount
                const frequencyData = new Uint8Array(bufferLength)

                const canvas = document.getElementsByTagName('canvas')[0]
                const canvasContext = canvas.getContext('2d')
                const canvasWidth = canvas.width
                const canvasHeight = canvas.height

                const barWidth = Math.floor(canvasWidth / bufferLength)

                const draw = () => {
                    audioAnalyser.getByteFrequencyData(frequencyData)
                    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
                    for (let i = 0; i < bufferLength; i++) {
                        const barHeight = frequencyData[i]
                        canvasContext.fillStyle = '#ffffff'
                        canvasContext.fillRect(i * barWidth, canvasHeight - barHeight, barWidth - 1, barHeight)
                    }
                }
                const loop = () => this.frameCaller.register(() => {
                    draw()

                    this.frameCaller.stopAll()
                    loop()
                })
                loop()
            }
            else {
                this.offCanvas()
            }
        },
        playFailed() {
            this.offCanvas()

            const onDocumentClick = () => {
                document.removeEventListener('click', onDocumentClick)
                this.play()
            }
            document.addEventListener('click', onDocumentClick)
        },
        offCanvas() {
            const canvas = document.getElementsByTagName('canvas')[0]
            const canvasContext = canvas.getContext('2d')
            const canvasWidth = canvas.width
            const canvasHeight = canvas.height
            canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
            for (let i = 0; i < 60; i++) {
                canvasContext.fillStyle = '#ffffff'
                canvasContext.fillRect(i * 4, 0, 3, canvasHeight)
            }
        },
        async onVinylClicked() {
            if (this.playing) {
                this.frameCaller.stopAll()
                this.audioPlayer.pause()
            }
            else {
                await this.audioPlayer.playCurrent()
                this.playSucceed()
            }
        },
        onVinylHandlerClicked($event) {
            if (!this.playing) {
                return
            }
            $event.target.classList.add('next')
            timeoutCaller.register(() => {
                $event.target.classList.remove('next')
                this.audioPlayer.next()
            }, 1000)
        },
        onVinylPowerClicked() {
            if (!this.stopped) {
                this.frameCaller.stopAll()
                this.audioPlayer.stop()
                this.offCanvas()
            }
            else {
                this.play()
            }
        },
    },
}
</script>

<style lang="scss" scoped>
$xs-max-width: 575px;
$sm-min-width: 576px;
$sm-max-width: 767px;
$md-min-width: 768px;
$md-max-width: 991px;
$lg-min-width: 992px;
$lg-max-width: 1199px;
$xl-min-width: 1200px;

@keyframes blink {
    5% {
        opacity: 1.0;
    }
    40% {
        opacity: 0;
    }
    60% {
        opacity: 0;
    }
    90% {
        opacity: 1.0;
    }
}

@keyframes blink-half {
    from {
        opacity: 1.0;
    }
    to {
        opacity: .5;
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes rotate-jump {
    0% {
        transform: rotate(30deg) translateX(-21px) translateY(8px);
    }
    100% {
        transform: rotate(45deg) translateX(-30px) translateY(15px);
    }
}

.home {
    font-family: 'Anton', cursive, sans-serif;

    a {
        text-decoration: none;
    }

    .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        background-position: 34% 34%;
        background-repeat: no-repeat;
        background-size: cover;

        @media (max-width: $sm-max-width) {
            background-position-x: 35%;
        }
    }

    .content {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
        overflow-x: hidden;
        overflow-y: auto;

        $goldenRatio: 1.618;

        $lineHeight: 1.5;

        $mediaMaxHeight: 640px;
        $mediaWidthTiny: 376px;
        $mediaWidthMedium: 818.18px;

        $h1FontSize: 50px;
        $h1TopAtMaxHeight: 25px;

        $blockTop: 18%;
        $blockLeft: 28%;
        $blockSize: 360px;
        $blockBorderSize: 16px;
        $blockTopAtMediaMaxHeight: $h1FontSize * $lineHeight + 2 * $h1TopAtMaxHeight;

        $navUp: 100px;
        $navPaddingX: 20px;
        $navFontSize: 36px;
        $navItemCounter: 4;
        $navHeight: $navFontSize * $lineHeight * $navItemCounter  + $navItemCounter * 2 * $navPaddingX;

        h1 {
            position: absolute;
            top: 5%;
            left: 35%;
            font-size: $h1FontSize;
            line-height: $lineHeight;
            color: #ffffff;

            @media (max-width: $mediaWidthTiny) {
                right: $navPaddingX;
                left: unset;
            }

            @media (max-height: $mediaMaxHeight) {
                top: $h1TopAtMaxHeight;
            }
        }

        blockquote {
            position: absolute;
            top: $blockTop;
            left: $blockLeft;
            border: $blockBorderSize solid #ffffff;
            width: $blockSize;
            height: $blockSize;

            @media (max-width: $mediaWidthMedium) {
                left: calc(50% - #{$blockSize / 2});
            }

            @media (max-width: $mediaWidthTiny) {
                left: 0;
                width: 100%;
                border-left: none;
                border-right: none;
            }

            @media (max-height: $mediaMaxHeight) {
                top: $blockTopAtMediaMaxHeight;
            }
        }

        nav {
            position: absolute;
            top: calc(#{$blockTop} + #{$blockSize - $navUp});
            left: $blockLeft;
            width: $blockSize;
            padding-right: #{$blockBorderSize};

            .nav-item {
                margin: $navPaddingX 0;
                text-align: right;

                a {
                    font-size: $navFontSize;

                    span {
                        padding: #{$navPaddingX / 2} $navPaddingX;
                        color: #ffffff;
                        white-space: nowrap;
                    }

                    &:hover {
                        text-decoration: none;

                        span {
                            background-color: #ffffff;
                            color: #000000;
                        }
                    }
                }

                &:not(:first-child) {
                    margin-right: -#{$blockBorderSize + $navPaddingX};
                }
            }

            .nav-item-divider {
                height: $navPaddingX;
            }

            @media (max-width: $mediaWidthMedium) {
                left: calc(50% - #{$blockSize / 2});
            }

            @media (max-width: $mediaWidthTiny) {
                left: 0;
                width: 100%;
                padding-right: 0;

                .nav-item {
                    &:not(:first-child) {
                        margin-right: 0;
                    }
                }
            }

            @media (max-height: $mediaMaxHeight) {
                top: $blockTopAtMediaMaxHeight + $blockSize - $navUp;
            }
        }

        $canvasHeight: $blockSize - $blockSize / $goldenRatio;

        canvas {
            position: absolute;
            top: calc(#{$blockTop} + #{$blockSize - $canvasHeight});
            left: calc(#{$blockLeft} + #{$blockSize + 2 * $navPaddingX});
            width: $blockSize;
            height: $canvasHeight;

            @media (max-width: $md-max-width) {
                top: calc(#{$blockTop} + #{$blockSize + $navHeight - $navUp});
                left: $blockLeft;
            }

            @media (max-width: $mediaWidthMedium) {
                left: calc(50% - #{$blockSize / 2});
            }

            @media (max-width: $mediaWidthTiny) {
                left: 0;
                width: 100%;
            }

            @media (max-height: $mediaMaxHeight) and (min-width: $lg-min-width) {
                top: $blockTopAtMediaMaxHeight + $blockSize - $canvasHeight;
            }

            @media (max-height: $mediaMaxHeight) and (max-width: $md-max-width) {
                top: $blockTopAtMediaMaxHeight + $blockSize + $navHeight - $navUp;
            }
        }

        .player {
            position: absolute;
            top: calc(#{$blockTop} + #{$blockSize + $navPaddingX * 2});
            left: calc(#{$blockLeft} + #{$blockSize + $navPaddingX * 2});
            width: $blockSize;
            height: $canvasHeight * 2;

            .vinyl-turntable {
                position: absolute;
                top: 8px;
                left: -1px;
            }

            .vinyl-led {
                cursor: pointer;
                position: absolute;
                top: 160px;
                left: 7px;
                animation: blink-half .175s infinite linear;

                &.grey {
                    animation: none;
                    opacity: .25;
                }

                &.red {
                    box-shadow: 0 0 4px #ff0000;
                    animation-name: blink;
                    animation-duration: 1s;
                }

                &.yellow {
                    box-shadow: 0 0 4px #f1b503;
                    animation: none;
                }

                &.green {
                    box-shadow: 0 0 4px #66f000;
                }
            }

            .vinyl-power {
                cursor: pointer;
                position: absolute;
                top: 154px;
                left: 5px;
                height: 15px;
                width: 42px;
                border: none;
                outline: none;
                background: none;
            }

            .vinyl-handler {
                cursor: pointer;
                position: absolute;
                top: 18px;
                left: 182px;

                &.playing, &.paused {
                    /* x = (R-a)(1-cosA) + 1; y = (R-a)sinA - 1; a = 30; R = 146 / 2 */
                    transform: rotate(30deg) translateX(-21px) translateY(8px);
                }

                &.next {
                    animation: rotate-jump .175s linear;
                }
            }

            .vinyl {
                position: absolute;
                top: 12px;
                left: 22px;
                visibility: hidden;
                animation: rotate 5s infinite linear;
                animation-play-state: paused;

                &.playing {
                    cursor: pointer;
                    visibility: visible;
                    animation-play-state: running;
                }

                &.paused {
                    cursor: pointer;
                    visibility: visible;
                    animation-play-state: paused;
                }
            }

            @media (max-width: $md-max-width) {
                top: calc(#{$blockTop} + #{$blockSize + $navHeight - $navUp + $canvasHeight + $navPaddingX * 2});
                left: $blockLeft;
            }

            @media (max-width: $mediaWidthMedium) {
                left: calc(50% - #{$blockSize / 2});
            }

            @media (max-width: $mediaWidthTiny) {
                left: 0;
                width: 100%;
            }

            @media (max-height: $mediaMaxHeight) and (min-width: $lg-min-width) {
                top: $blockTopAtMediaMaxHeight + $blockSize + $navPaddingX * 2;
            }

            @media (max-height: $mediaMaxHeight) and (max-width: $md-max-width) {
                top: $blockTopAtMediaMaxHeight + $blockSize + $navHeight - $navUp + $canvasHeight + $navPaddingX * 2;
            }
        }
    }
}
</style>
