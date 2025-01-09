const musicList = [
    {
        name: "levanto-mi-copa",
        route: "../assets/audio/levanto-mi-copa.mp3"
    },
    {
        name: "carrampincho",
        route : "../assets/audio/carrapicho-nojodas.mp3",
    }
]

const instanceAudioList = () => {

    musicList.forEach(elem => {
       elem.audio =  new Audio(elem.route);
    })

    return musicList;
}

export class SoundPlayer {
    constructor(){
        this.counter = 0
        this.playedAll = false
        this.list = instanceAudioList()
    }

    playAll = (isLoop) => {
       
        if(!this.playedAll){
            musicList.forEach(({ audio }, index) => {
                audio.addEventListener("ended", () => {
                    console.log("fin de la cancion")
                    if(this.counter <= musicList.length - 1){
                        this.counter +=1
                        this.play();
                    } else {
                        if(isLoop){
                         this.counter = 0;
                         this.play();    
                        }

                        this.playedAll = false;
                    }
                })
                musicList[0].audio.play()
            })
        } else {
            console.warn("La lista de audios ya se encuentra en reproducción")
        }
    }

    play = (name) => {
        if(name){
            const audioObject = musicList.find(elem => {
                if(elem.name == name){
                    return true;
                }
            })
            
            console.log(audioObject)
            audioObject.audio.play()
            return audioObject.audio;
        }

        musicList[this.counter].audio.play();
    }
}

export const SoundPlayer01 = new SoundPlayer();