// Get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector("#full");

// Build out functions
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  // console.log(method);
  video[method]();
}

function updateButton() {
  toggle.innerHTML = video.paused
    ? '<i class="fas fa-play"></i>'
    : '<i class="fas fa-pause"></i>';
}

function skip(e) {
  // console.log(this.dataset.skip);
  // right arraw
  let skipTime = 0;
  if (e.keyCode === 39)
    skipTime = document.querySelector(".forward").dataset.skip;
  else if (e.keyCode === 37)
    skipTime = document.querySelector(".backward").dataset.skip;
  else skipTime = this.dataset.skip;

  video.currentTime += parseFloat(skipTime);
}

function handleRangeUpdate() {
  // console.log(this.value);
  video[this.name] = this.value;
}

function handleProgress() {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullScreen() {
  if (!document.mozFullScreen && !document.webkitFullScreen) {
    if (video.mozRequestFullScreen) {
      video.requestFullScreen();
    } else {
      video.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
    // video.requestFullscreen();
  }
}
// Hook up the event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(skipButton => {
  skipButton.addEventListener("click", skip);
});

ranges.forEach(range => {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("mousemove", handleRangeUpdate);
});

progress.addEventListener("click", scrub);
let mousedown = false;
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
progress.addEventListener("mousemove", e => mousedown && scrub(e));

fullScreen.addEventListener("click", toggleFullScreen);
document.addEventListener(
  "keydown",
  e => {
    switch (e.keyCode) {
      case 13:
        toggleFullScreen();
        break;
      case 32:
        togglePlay();
        break;
      case 39:
        skip(e);
        break;
      case 37:
        skip(e);
        break;
      default:
        return;
    }
  },
  false
);
