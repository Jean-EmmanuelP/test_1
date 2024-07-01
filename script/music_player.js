let musicPlayer = document.querySelector(".music-player-container");
let togglePlayer = document.querySelector(".toggle-player");

let trackInfo = document.querySelector(".track-info");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");
let trackNav = document.querySelector(".track-nav");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let trackIndex = 0;
let isPlaying = false;
let isHidden = true;

let currentTrack = document.createElement("audio");

let soundBars = document.querySelector(".sound-bars");

togglePlayer.addEventListener("click", function () {
  isHidden = !isHidden;
  if (isHidden) {
    musicPlayer.classList.remove("hide");
    togglePlayer.innerHTML = '<ion-icon name="remove-outline"></ion-icon>';
    trackInfo.style.transitionDelay = "0.4s";
    trackNav.style.transitionDelay = "0.4s";
  } else {
    musicPlayer.classList.add("hide");
    togglePlayer.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
    trackInfo.style.transitionDelay = "0s";
    trackNav.style.transitionDelay = "0s";
  }
});

let soundBarsLottie = bodymovin.loadAnimation({
  container: soundBars,
  renderer: "svg",
  loop: true,
  autoplay: false,
  path: "/assets/json/sound_bars.json",
});

let trackList = [
  {
    name: "Papa",
    artist: "Malick Diaw",
    path: "./assets/songs/malick_diaw_papa.mp3",
  },
  {
    name: "The Raindrop",
    artist: "Romain Swan",
    path: "./assets/songs/romain_swan_the_raindrop.mp3",
  },
  {
    name: "Animals",
    artist: "Martin Garrix",
    path: "./assets/songs/martin_garrix_animals.mp3",
  },
];

function loadTrack(trackIndex) {
  currentTrack.src = trackList[trackIndex].path;
  currentTrack.load();
  trackName.textContent = trackList[trackIndex].name;
  trackArtist.textContent = trackList[trackIndex].artist;
  currentTrack.addEventListener("ended", nextTrack);
}

loadTrack(trackIndex);

function playPauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  currentTrack.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<ion-icon name="pause-sharp"></ion-icon>';
  soundBarsLottie.playSegments([0, 120], true);
}

function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  playPauseBtn.innerHTML = '<ion-icon name="play-sharp"></ion-icon>';
  soundBarsLottie.stop();
}

function nextTrack() {
  if (trackIndex < trackList.length - 1) trackIndex += 1;
  else trackIndex = 0;
  loadTrack(trackIndex);
  playTrack();
}

function prevTrack() {
  if (trackIndex > 0) trackIndex -= 1;
  else trackIndex = trackList.length;
  loadTrack(trackIndex);
  playTrack();
}
