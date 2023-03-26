<script lang="ts">
    import { useDrumStore } from "@/stores/drum";

    export default {
        setup(){
            const store = useDrumStore()
            return {
                select: store.select

            }
        },
        props: {
            colIndex: Number,
            padIndex: Number,
            isActive: Boolean,
            isCurrent: Boolean
        },
        computed: {
            padStyle(){
                    
                    const gradientStart = this.isCurrent ? '25%' : '0%' 
                
                    if(!this.isActive){
                        return {
                            background: `radial-gradient(circle at 50% 50%, hsl(0, 0%, 94%) ${gradientStart}, hsl(0, 0%, 28%)) 100%`
                        }
                    }
                    
                    switch (this.padIndex) {
                        case 0:
                            return {
                                background: `radial-gradient(circle at 50% 50%, hsl(0, 0%, 94%) ${gradientStart}, hsl(360, 80%, 28%) 100%)`
                            }
                        case 1:
                            return {
                                background: `radial-gradient(circle at 50% 50%, hsl(0, 0%, 94%) ${gradientStart}, hsl(60, 80%, 28%) 100%)`
                            }
                        case 2:
                            return {
                                background: `radial-gradient(circle at 50% 50%, hsl(0, 0%, 94%) ${gradientStart}, hsl(104, 80%, 28%) 100%)`
                            }         
                        case 3:
                            return {
                                background: `radial-gradient(circle at 50% 50%, hsl(0, 0%, 94%) ${gradientStart}, hsl(240, 80%, 28%) 100%)`
                            }      
                        default:
                            break;
                    }
            }
        }
    }
</script>

<template>
    <div class="pad" 
    :style="padStyle"
    @click="select(colIndex, padIndex)">
    </div>
</template>

