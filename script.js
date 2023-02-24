const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songTitles = ['hey', 'summer', 'ukulele'];

// Song tracker
let songIndex = 1;

// Initialize load song details
loadSong(songTitles[songIndex]);

function loadSong(songTitle) {
  title.innerText = songTitle;
  audio.src = `music/${songTitle}.mp3`;
  cover.src = `images/${songTitle}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
}

function prevSong() {
  songIndex -= 1;

  if (songIndex < 0) {
    songIndex = songTitles.length - 1;
  }

  loadSong(songTitles[songIndex]);

  playSong();
}

function nextSong() {
  songIndex += 1;

  if (songIndex > songTitles.length -1) {
    songIndex = 0;
  }

  loadSong(songTitles[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = currentTime / duration * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const {duration} = audio;

  audio.currentTime = clickX / width * duration;
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)