import { defineStore } from 'pinia'
import { DrumType } from '@/types/enums'

export const useDrumStore = defineStore('drumStore', {

    state: () => {
        return {
            pattern: [
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false]
            ],
            currentBeatNumber: null
        }
    },
    getters: {
        getPattern(state){
            return state.pattern
        }
    },
    actions: {
        select(beatNumber: number, soundType: number ){
            this.pattern[beatNumber][soundType] = !this.pattern[beatNumber][soundType];
        },
        setCurrentBeat(beatNumber: number){
            this.currentBeatNumber = beatNumber
            
        }
    }
})
