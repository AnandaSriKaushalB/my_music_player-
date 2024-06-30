console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs2/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Cartoon - On & On", filePath: "songs2/1.mp3", coverPath: "assets/covers/11.jpg"},
    {songName: "Heroes Tonight (feat. Johnning) by Janji", filePath: "songs2/2.mp3", coverPath: "assets/covers/12.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs2/3.mp3", coverPath: "assets/covers/13.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs2/4.mp3", coverPath: "assets/covers/14.jpg"},
    {songName: "Warriyo - Mortals (feat. Laura Brehm)", filePath: "songs2/5.mp3", coverPath: "assets/covers/15.jpg"},
    {songName: "Disfigure - Blank [NCS Release]", filePath: "songs2/6.mp3", coverPath: "assets/covers/16.jpg"},
    {songName: "Elektronomia - Sky High [NCS Release]", filePath: "songs2/7.mp3", coverPath: "assets/covers/17.jpg"},
    {songName: "Cartoon - Why We Lose (feat. Coleman Trapp)", filePath: "songs2/8.mp3", coverPath: "assets/covers/18.jpg"},
    {songName: "Lost Sky - Fearless [NCS Release]", filePath: "songs2/9.mp3", coverPath: "assets/covers/19.jpg"},
    {songName: "TheFatRat - Fly Away feat. Anjulie", filePath: "songs2/10.mp3", coverPath: "assets/covers/20.jpg"},
];

songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});
 

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => { 
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs2/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs2/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs2/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
