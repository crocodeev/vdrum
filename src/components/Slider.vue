<script lang="ts">
    import { useDrumStore } from "@/stores/drum";

    export default {
        setup() {
            const store = useDrumStore();

            return {
                setTempo: store.setTempo
            }
        },
        methods: {
            onChange($event: InputEvent){
                if($event.target && $event.target.value){
                    this.setTempo($event.target.value)
                }
            }
        }
    }
</script>

<template>
    <div class="slidecontainer">
        <input @change="onChange($event)" type="range" min="1" max="100" value="50" class="slider" id="myRange">
    </div>
</template>