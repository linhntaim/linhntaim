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
</template>

<script>
    import {APP_URL} from '../../app/config'

    export default {
        name: 'Home',
        data() {
            return {
                audio: null,
            }
        },
        mounted() {
            this.audio = new Audio(APP_URL + '/sites/sounds/if_you_want_love.mp3')
            this.audio.loop = true
            this.audio.play()
        },
    }
</script>

<style scoped>

</style>