<script lang="ts">
    import StartButton from "./StartButton.vue"
    import StopButton from "./StopButton.vue"
    import Slider from "./Slider.vue"
    import TempoDisplay from "./TempoDisplay.vue";
    import SoundEngine from "@/audio/soundEngine";

    const soundEngine = SoundEngine.getInstance();

    export default {
        components: {
    StartButton,
    StopButton,
    Slider,
    TempoDisplay
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
    <div class="controls">
        <StartButton @click="play()"/>
        <StopButton @click="stop()"/>
        <Slider />
        <TempoDisplay />
    </div>
</template>