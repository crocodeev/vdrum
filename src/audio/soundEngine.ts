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
    private _tempo: Number
    private _setTOID: Number
    private _pattern: any
    private _currentBeat: Function
    
    private constructor() {
        this.hw = Howler
        this._bd = new Howl({ src: [bd] })
        this._sn = new Howl({ src: [sn] })
        this._hh = new Howl({ src: [hh] })
        this._cb = new Howl({ src: [cb] })
        this._tempo = 120
        this._setTOID = 0
        this._pattern
        this._currentBeat = () => undefined

    }

    public static getInstance(): SoundEngine {

        if(!SoundEngine.instance){
            SoundEngine.instance = new SoundEngine()
        }

        return SoundEngine.instance
    }

    //bad variant, but for test
    play(){

        let count = 0;
        
        this._setTOID = setInterval(() => {

            const current = this._pattern[count]

            this._currentBeat(count);
            
            current[0] && this._bd.play()
            current[1] && this._sn.play()
            current[2] && this._hh.play()
            current[3] && this._cb.play()

            count++

            if (count === 16) {
                count = 0
            }

        }, 125)

    }

    stop(){
        clearInterval(this._setTOID)
    }

    set store(store: any){
        this._pattern = store.getPattern
        this._currentBeat = store.setCurrentBeat
    }

}

export default SoundEngine