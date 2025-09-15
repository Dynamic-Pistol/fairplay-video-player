const video = document.getElementById("video");
const playPauseBtn = document.getElementById("play-pause");
const volumeBtn = document.getElementById("mute");
const volumeSlider = document.getElementById("volume");
const progressBar = document.getElementById("progress-bar");
const timeDisplay = document.getElementById("time");
const fullscreenBtn = document.getElementById("fullscreen");
const controls = document.getElementById("controls");
const settingsBtn = document.getElementById("settings");
const settingsMenu = document.getElementById("settings-menu");
const speedOptions = settingsMenu.querySelectorAll("li");

let controlsTimeout;

function timelineUpdate() {
  function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  const value = (video.currentTime / video.duration) * 100 || 0;
  progressBar.value = value;
  timeDisplay.textContent =
    formatTime(video.currentTime) + " / " + formatTime(video.duration);

  progressBar.style.background = `linear-gradient(to right, var(--accent-color) ${value}%, #666 ${value}%)`;
}

function videoProgress() {
  const value = progressBar.value;
  video.currentTime = (value / 100) * video.duration;
  progressBar.style.background = `linear-gradient(to right, var(--accent-color) ${value}%, #666 ${value}%)`;
}

function audioLevel() {
  video.volume = volumeSlider.value;

  const value = volumeSlider.value * 100;
  volumeSlider.style.background = `linear-gradient(to right, var(--accent-color) ${value}%, #666 ${value}%)`;
}

function loadedMetaData() {
  const value = video.volume * 100;
  volumeSlider.style.background = `linear-gradient(to right, var(--accent-color) ${value}%, #666 ${value}%)`;
}

function fullScreen() {
  if (!document.fullscreenElement) {
    video.parentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  fullscreenBtn.querySelector("img").src = !document.fullscreenElement ? "/icons/exit-full-screen.svg" : "/icons/full-screen.svg";
}

function showControls() {
  controls.classList.remove("hidden");
  clearTimeout(controlsTimeout);
  controlsTimeout = setTimeout(() => {
    if (!video.paused) {
      controls.classList.add("hidden");
      settingsMenu.classList.remove("active");
    }
  }, 2000);
}

function showControlsNoTimeOut() {
  controls.classList.remove("hidden");
}

function toggleSettingsActive() {
  settingsMenu.classList.toggle("active");
}

speedOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const speed = parseFloat(option.dataset.speed);
    video.playbackRate = speed;

    speedOptions.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");

    settingsMenu.classList.remove("active");
  });
});

function pageClicked(){
  if (!settingsBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
    settingsMenu.classList.remove("active");
  }
}

function playPause() {
  if (video.paused) {
    video.play();
    playPauseBtn.querySelector("img").src = "/icons/pause.svg";
  } else {
    video.pause();
    playPauseBtn.querySelector("img").src = "/icons/play.svg";
  }
}

function mute() {
  video.muted = !video.muted;
  volumeBtn.querySelector("img").src = video.muted ? "/icons/mute.svg" : "/icons/volume.svg";
}