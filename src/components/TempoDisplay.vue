<script setup lang="ts">
    import { useDrumStore } from "@/stores/drum";

    const store = useDrumStore();

    const tempo = () => store.tempo

</script>

<template>
    <div class="display_temp">
        <h2>{{tempo()}}</h2>
    </div>
</template>