<script lang="ts">
    import StartButton from "./StartButton.vue"
    import StopButton from "./StopButton.vue"
    import SoundEngine from "@/audio/soundEngine";

    const soundEngine = SoundEngine.getInstance();

    export default {
        components: {
            StartButton,
            StopButton
        },
        methods: {
            play() {
                soundEngine.play();
            },
            stop() {
                soundEngine.stop();
            }
        }
    }
</script>

<template>
    <div>
        <StartButton @click="play()"/>
        <StopButton @click="stop()"/>
    </div>
</template>