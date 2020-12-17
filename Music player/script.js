const image =document.querySelector("img")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const music = document.querySelector("audio")
const progressContainer =document.getElementById("progress-container")
const progress = document.getElementById("progress")
const currentTimeEl = document.getElementById("current-time")
const durationEl = document.getElementById("duration")
const prevBtn = document.getElementById("prev")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")


// Check if playing 
let isPlaying = false

// our Music
const songs = [
    {
        name: "jacinto-1", // we gonna use this for song element and img element 
        displayName: "Electric Chill Machine",
        artist: "Jacinto Design",
    },
    {
        name: "jacinto-2", // we gonna use this for song element and img element 
        displayName: "Seven Nation Army (Remix)",
        artist: "Jacinto Design",
    },
    {
        name: "jacinto-3", // we gonna use this for song element and img element 
        displayName: "Front Row (Remix)",
        artist: "Metric/Jacinto Design",
    },
]


// play
function playSong(){
    isPlaying = true
    // when is playing change from play to pasue 
    playBtn.classList.replace("fa-play", "fa-pause")
    // chnage tittle
    playBtn.setAttribute("title", "Pause")
    music.play()
}

// Pause
function pauseSong(){
    isPlaying=false
    // when is pasue change from pasue to play 
    playBtn.classList.replace("fa-pause", "fa-play")
    // chnage tittle
    playBtn.setAttribute("title", "Play")
    music.pause()
}


// play or pause event listener

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))
    // if is playing pause else play song when we click on play fas
    


// update the dom with our 
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`
}

// Current song
let songIndex = 0

// Next song
function nextSong(){
    songIndex++

    if(songIndex > songs.length -1){
        songIndex = 0
    }

    loadSong(songs[songIndex]);
    playSong()
}
// Prev song
function prevSong(){
    songIndex--

    if(songIndex <0){
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex]);
    playSong()
}


// On load - select first song
loadSong(songs[songIndex]);


// Update progress ba and time
function updateProgressBar(e){
    // only hne is playing we want ot update it 
    if(isPlaying){
        // console.log(e)
        // we get curenttime and uration in our e we we play play form srcELement
        const { duration, currentTime} = e.srcElement;
        // console.log(duration, currentTime)

        // update progress bar width 
        const progressPercent = (currentTime/ duration) * 100;
        // console.log(progressPercent)
        // in our prgress we gonna add out style and our %
        progress.style.width = `${progressPercent}%`;

        // Calcuate display for duration 
        const durationMunites = Math.floor(duration / 60);
        console.log("munites:", durationMunites)
        // remainder for second
        let durationSecond = Math.floor(duration % 60)
        if (durationSecond < 10){
            durationSecond = `0${durationSecond}`
        }
        console.log("second:" ,durationSecond)
        

        // delay switchind duration element to avoid NAN
        if(durationSecond){
            durationEl.textContent = `${durationMunites}:${durationSecond}`;

        } 

         // Calcuate display for display
         const currentMunites = Math.floor(currentTime / 60);
         console.log("munites:", currentMunites)
         // remainder for second
         let currentSecond = Math.floor(currentTime % 60)
         if (currentSecond < 10){
             currentSecond = `0${currentSecond}`
         }
         console.log("second:" ,currentSecond)
         currentTimeEl.textContent = `${currentMunites}:${currentSecond}`;

    }
}



// Set progress bar 
function setProgressBar(e){
    console.log(e)
    const width  = this.clientWidth;
    console.log("width", width)

    const clickX = e.offsetX;
    console.log("clickX",clickX)

    const {duration} = music;
    console.log(clickX / width)
    console.log((clickX / width) * duration)
    music.currentTime = (clickX / width) * duration;

}

// Evenet Listener 
prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)
music.addEventListener("timeupdate", updateProgressBar)
progressContainer.addEventListener("click", setProgressBar)

// wene one song end play the next song 
music.addEventListener("ended", nextSong)