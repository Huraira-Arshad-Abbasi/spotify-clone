console.log("welcome to my first project")
// intilazing variables
let songindex = 0;
let audioElement = new Audio('songs/1.wav');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songsItem'));

let songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filepath: "songs/1.wav", coverpath: "covers/1.jpg", duration: "00:08" },
    { songName: "Cielo - Huma-Huma", filepath: "songs/2.wav", coverpath: "covers/2.jpg", duration: "00:08" },
    { songName: "Invincible [NCS Release]", filepath: "songs/3.wav", coverpath: "covers/3.jpg", duration: "00:08" },
    { songName: "Different Heaven & EH!DE", filepath: "songs/4.wav", coverpath: "covers/4.jpg", duration: "00:08" },
    { songName: "Janji - Heroes Tonight", filepath: "songs/5.wav", coverpath: "covers/5.jpg", duration: "00:08" },
    { songName: "Rabba - Salam-e-Ishq", filepath: "songs/6.wav", coverpath: "covers/6.jpg", duration: "00:08" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filepath: "songs/7.wav", coverpath: "covers/7.jpg", duration: "00:08" },
    { songName: "Bhula Dena - Salam-e-Ishq", filepath: "songs/8.wav", coverpath: "covers/8.jpg", duration: "00:08" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filepath: "songs/9.wav", coverpath: "covers/9.jpg", duration: "00:08" },
    { songName: "Na Jaana - Salam-e-Ishq", filepath: "songs/10.wav", coverpath: "covers/10.jpg", duration: "00:08" }
];

// fill the song list from the array above
songItems.forEach((element, i) => {
    document.getElementsByClassName("img")[i].src = songs[i].coverpath;
    document.getElementsByClassName("songName")[i].innerText = songs[i].songName;
    document.getElementsByClassName("timestamp")[i].firstChild.textContent = " " + songs[i].duration + " ";
});

// show which row is loaded, and only swap the icon once it is really playing
const updateSongList = () => {
    songItems.forEach((element, i) => {
        const icon = element.querySelector('.songItemPlay');
        if (i === songindex) {
            element.classList.add('playing');
            if (!audioElement.paused) {
                icon.classList.remove('fa-play-circle');
                icon.classList.add('fa-pause-circle');
            }
        }
        else {
            element.classList.remove('playing');
            icon.classList.remove('fa-pause-circle');
            icon.classList.add('fa-play-circle');
        }
    })
}

// load a song by its position in the array
const loadSong = (index) => {
    songindex = index;
    audioElement.src = songs[songindex].filepath;
    masterSongName.innerText = songs[songindex].songName;
    audioElement.currentTime = 0;
    updateSongList();
}

// keep the big play button in sync with whatever the audio is doing
audioElement.addEventListener('play', () => {
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    updateSongList();
});

audioElement.addEventListener('pause', () => {
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    updateSongList();
});

// go to the next song when the current one finishes
audioElement.addEventListener('ended', () => {
    if (songindex >= songs.length - 1) {
        loadSong(0);
    }
    else {
        loadSong(songindex + 1);
    }
    audioElement.play();
});

// master play / pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
})

//liston event
audioElement.addEventListener('timeupdate', () => {
    // Updating seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        loadSong(parseInt(e.target.id));
        audioElement.play();
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songindex >= songs.length - 1) {
        loadSong(0);
    }
    else {
        loadSong(songindex + 1);
    }
    audioElement.play();
})

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        loadSong(songs.length - 1);
    }
    else {
        loadSong(songindex - 1);
    }
    audioElement.play();
})

// show the first song as ready on page load
updateSongList();