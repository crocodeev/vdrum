<script lang="ts">

    import Pad from "./Pad.vue";
    import Controls from "./Controls.vue";
    import { useDrumStore } from "@/stores/drum";

    export default {
        setup() {
            const store = useDrumStore();
           
            const currentBeatNumber = () => { return store.currentBeatNumber }
            return {
                pattern: store.pattern, 
                currentBeatNumber: currentBeatNumber
            }
        },
        components: {
            Pad,
            Controls
        },
        computed: {
            colStyles(){
                return function(index: number){
                    return {
                        "grid-column": index + 1
                    }
                }
            },
            isCurrent(){

                const currentBeatNumber = this.currentBeatNumber()

                return function(colIndex: number){
                    return colIndex === currentBeatNumber
                }
            }
        }
    }
    

</script>

<template>
    <div class="pad_container">
        <div class="pad_column" 
        v-for="(pads, colIndex) in pattern"
        :style="colStyles(colIndex)" 
        :key="colIndex">
            <Pad v-for="(pad, padIndex) in pads"
            :key="padIndex"
            :colIndex="colIndex"
            :padIndex="padIndex"
            :isActive="pad"
            :isCurrent="isCurrent(colIndex)"/>
        </div>
    </div>
    <Controls />
</template>

