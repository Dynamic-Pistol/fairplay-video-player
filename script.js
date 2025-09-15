document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  const playPauseBtn = document.getElementById("play-pause");
  const volumeBtn = document.getElementById("mute");
  const volumeSlider = document.getElementById("volume");
  const progress = document.getElementById("progress");
  const timeDisplay = document.getElementById("time");
  const fullscreenBtn = document.getElementById("fullscreen");
  const controls = document.getElementById("controls");
  const settingsBtn = document.getElementById("settings");
  const settingsMenu = document.getElementById("settings-menu");
  const speedOptions = settingsMenu.querySelectorAll("li");

  let controlsTimeout;

  function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  playPauseBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playPauseBtn.querySelector("img").src = "/icons/pause.svg";
    } else {
      video.pause();
      playPauseBtn.querySelector("img").src = "/icons/play.svg";
    }
  });

  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playPauseBtn.querySelector("img").src = "/icons/pause.svg";
    } else {
      video.pause();
      playPauseBtn.querySelector("img").src = "/icons/play.svg";
    }
  });

  video.addEventListener("timeupdate", () => {
    const value = (video.currentTime / video.duration) * 100 || 0;
    progress.value = value;
    timeDisplay.textContent =
      formatTime(video.currentTime) + " / " + formatTime(video.duration);

    progress.style.background = `linear-gradient(to right, var(--accent-color) ${value}%, #666 ${value}%)`;
  });

  progress.addEventListener("input", () => {
    const value = progress.value;
    video.currentTime = (value / 100) * video.duration;
    progress.style.background = `linear-gradient(to right, var(--accent-color) ${value}%, #666 ${value}%)`;
  });

  volumeSlider.addEventListener("input", () => {
    video.volume = volumeSlider.value;

    const value = volumeSlider.value * 100;
    volumeSlider.style.background = `linear-gradient(to right, var(--accent-color) ${value}%, #666 ${value}%)`;
  });

  video.addEventListener("loadedmetadata", () => {
    const value = video.volume * 100;
    volumeSlider.style.background = `linear-gradient(to right, var(--accent-color) ${value}%, #666 ${value}%)`;
  });

  volumeBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    if (video.muted) {
      volumeBtn.querySelector("img").src = "/icons/mute.svg";
    } else {
      volumeBtn.querySelector("img").src = "/icons/volume.svg";
    }
  });

  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      video.parentElement.requestFullscreen();
      fullscreenBtn.querySelector("img").src = "/icons/exit-full-screen.svg";
    } else {
      document.exitFullscreen();
      fullscreenBtn.querySelector("img").src = "/icons/full-screen.svg";
    }
  });

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

  document.addEventListener("mousemove", showControls);
  document.addEventListener("keydown", showControls);
  video.addEventListener("play", showControls);
  video.addEventListener("pause", () => controls.classList.remove("hidden"));

  settingsBtn.addEventListener("click", () => {
    settingsMenu.classList.toggle("active");
  });

  speedOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const speed = parseFloat(option.dataset.speed);
      video.playbackRate = speed;

      speedOptions.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");

      settingsMenu.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!settingsBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
      settingsMenu.classList.remove("active");
    }
  });
});