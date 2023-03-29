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
    private _noteTime: number
    private _startTime: number


    private constructor() {
        this.hw = Howler
        this._bd = new Howl({ src: [bd] })
        this._sn = new Howl({ src: [sn] })
        this._hh = new Howl({ src: [hh] })
        this._cb = new Howl({ src: [cb] })
        this._tempo = 120
        this._pattern
        this._currentBeat = () => undefined
        this._startTime = 0
        this._noteTime = 0 // note length
        this._nextNoteTime = 0
        this._current16thNote = 0
        this._ac = Howler.ctx
        this._scheduleAheadTime = 0.2
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
        //reset note time
        this._noteTime = 0
        this._current16thNote = 0
        
        //offset for js main execution time 
        this._startTime = this._ac.currentTime + 0.005
        
        this.scheduler()
    }

    scheduler() {
        
        let currentTime = this._ac.currentTime
        currentTime -= this._startTime
        
        while (this._noteTime < currentTime + this._scheduleAheadTime ) {
    
            console.log(this._current16thNote);
            
            this.playBeat(this._current16thNote);
            this.nextNote();

        }

        this._timerID = setTimeout(() => this.scheduler(), 5)
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
        
        this._current16thNote++

        if(this._current16thNote == 16){
            this._current16thNote = 0
        }

        this._noteTime += 0.25 * secondsPerBeat

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