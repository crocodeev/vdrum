import { Howl, Howler } from 'howler'
import bd from './assets/bd.mp3'
import sn from './assets/sn.mp3'
import hh from './assets/hh.mp3'
import cb from './assets/cb.mp3'

class SoundEngine {

    private static instance: SoundEngine
    hw: Howler
    private _bd: Howl
    private _sn: Howl
    private _hh: Howl
    private _cb: Howl
    private _tempo: number
    private _pattern: any
    private _currentBeat: Function
    private _nextNoteTime: number
    private _current16thNote: number
    private _ac: any
    private _scheduleAheadTime: number
    private _isPlaying: boolean
    private _timerID: NodeJS.Timer | null


    private constructor() {
        this.hw = Howler
        this._bd = new Howl({ src: [bd] })
        this._sn = new Howl({ src: [sn] })
        this._hh = new Howl({ src: [hh] })
        this._cb = new Howl({ src: [cb] })
        this._tempo = 120
        this._pattern
        this._currentBeat = () => undefined
        this._nextNoteTime = 0
        this._current16thNote = 0
        this._ac = Howler.ctx
        this._scheduleAheadTime = 0.1
        this._isPlaying = false
        this._timerID = null

    }

    public static getInstance(): SoundEngine {

        if(!SoundEngine.instance){
            SoundEngine.instance = new SoundEngine()
        }

        return SoundEngine.instance
    }

    
    play(){

        if(this._isPlaying){
            return 
        }

        this._isPlaying = true
        this._current16thNote = 0
        this._nextNoteTime = this._ac.currentTime

        this._timerID = setInterval(() => {
            this.scheduler()
        }, 100)


    }

    scheduler() {
        
        while (this._nextNoteTime < this._ac.currentTime + this._scheduleAheadTime ) {
            this.playBeat(this._current16thNote);
            this.nextNote();
        }
    }


    playBeat( beatNumber: number) {
        const currentPattern = this._pattern[beatNumber]

        currentPattern[0] && this._bd.play()
        currentPattern[1] && this._sn.play()
        currentPattern[2] && this._hh.play()
        currentPattern[3] && this._cb.play()

        this._currentBeat(beatNumber)
    
    }

    stop(){
        this._timerID && clearInterval(this._timerID)
        this._isPlaying = false
    }

    nextNote(){

        const secondsPerBeat = 60/this._tempo
        this._nextNoteTime += 0.25 * secondsPerBeat
        this._current16thNote++

        if(this._current16thNote == 16){
            this._current16thNote = 0
        }

    }

    set store(store: any){
        this._pattern = store.getPattern
        this._currentBeat = store.setCurrentBeat

        store.$subscribe((mutation: any, state: any) => {
            this._tempo = state.tempo
        })
    }

}

export default SoundEngine