const music_list = [{
        img: 'img/faded.png',
        name: 'Faded',
        singer: 'Alan Walker',
        music: 'music/Faded.mp3'
    },
    {
        img: 'img/stay.png',
        name: 'Stay',
        singer: 'The Kid LAROI, Justin Bieber',
        music: 'music/stay.mp3'
    },
    {
        img: 'img/withoutMe.png',
        name: 'Without Me',
        singer: 'Halsey',
        music: 'music/WithoutMe.mp3'
    }
];

const music_number = document.querySelector(".music-number");
const music_img = document.querySelector(".music-img");
const music_name = document.querySelector(".music-name");
const music_singer = document.querySelector(".music-singer");
const music = document.querySelector(".music");

const startTime = document.querySelector(".start-time");
const endTime = document.querySelector(".end-time");
const time_range = document.querySelector(".time-range");
const volume_range = document.querySelector(".volume-range");

let musicIndex = 0;
let isPlaying = false;
let isRandom = false;

// Buttons
const playpause_btn = document.querySelector('.playpause-btn i');
const next_btn = document.querySelector('.next-btn i');
const prev_btn = document.querySelector('.prev-btn i');
const random_btn = document.querySelector('.random-btn i');
const repeat_btn = document.querySelector('.repeat-btn i');


loadMusic(musicIndex);

function loadMusic(musicIndex) {

    music.src = music_list[musicIndex].music;
    music_img.style.backgroundImage = `url(${music_list[musicIndex].img})`;
    music_singer.textContent = music_list[musicIndex].singer;
    music_name.textContent = music_list[musicIndex].name;
    music_number.textContent = "Playing music " + (musicIndex + 1) + " of " + music_list.length;

    random_bg();
}
music.addEventListener('ended', () => {
    next_btn.click();
});

playpause_btn.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
});

function playMusic() {
    music.play();
    isPlaying = true;
    music_img.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.classList = 'fa-solid fa-circle-pause fa-3x';
}

function pauseMusic() {
    music.pause();
    isPlaying = false;
    music_img.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.classList = 'fa-solid fa-circle-play fa-3x';
}

next_btn.addEventListener("click", () => {
    if (musicIndex < music_list.length - 1 && isRandom == false) {
        musicIndex++;
    }else if (musicIndex < music_list.length - 1 && isRandom == true){
        musicIndex = Math.floor(Math.random() * music_list.length);
    }
    else{
        musicIndex = 0;
    }
    loadMusic(musicIndex);
    playMusic();
});

prev_btn.addEventListener("click", () => {
    if (musicIndex > 0) {
        musicIndex--;
    } else {
        musicIndex = music_list.length - 1;
    }
    loadMusic(musicIndex);
    playMusic();
});

random_btn.addEventListener("click", () => {
    isRandom ? pauseRandom() : playRandom();
});
function playRandom(){
    isRandom = true;
    random_btn.classList.add("randomActive");
}
function pauseRandom(){
    isRandom = false;
    random_btn.classList.remove("randomActive");
}

repeat_btn.addEventListener("click", () => {
    let currentIndex = musicIndex;
    loadMusic(currentIndex);
    playMusic();
});

function calculateTime(totalSecond) {
    const minute = Math.floor(totalSecond / 60);
    const second = Math.floor(totalSecond % 60);
    const updateSecond = second < 10 ? `0${second}`: second;
    const result = `${minute}:${updateSecond}`;
    return result;
}

music.addEventListener("loadedmetadata", () => {
    endTime.textContent = calculateTime(music.duration);
    time_range.max = Math.floor(music.duration);
});

music.addEventListener("timeupdate", () => {
    time_range.value = Math.floor(music.currentTime);
    startTime.textContent = calculateTime(time_range.value);
});

time_range.addEventListener("input", () => {
    startTime.textContent = calculateTime(time_range.value);
    music.currentTime = time_range.value;
});

volume_range.addEventListener("input", () => {
    music.volume = volume_range.value / 100;
});

function random_bg() {
    let codes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd'];
    let colorCode = "#";

    function randomColor() {
        for (let i = 0; i < 6; i++) {
            colorCode += codes[Math.floor(Math.random() * codes.length)];
        }
        return colorCode;
    }
    let color1 = randomColor();
    colorCode = "#";
    let color2 = randomColor();
    let gradient = `linear-gradient(to right , ${color1} , ${color2})`;
    document.body.style.background = gradient;
}