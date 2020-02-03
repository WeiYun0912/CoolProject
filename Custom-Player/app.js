const video = document.querySelector("video");
const play = document.querySelector("#play");
const stop = document.querySelector("#stop");
const progress = document.querySelector("#progress");
const timestamp = document.querySelector("#timestamp");
const inputFile = document.querySelector("#inputFile");
//開始和暫停影片
function toggleVideoStatus() {
  if (video.src === "") {
    alert("請先選擇影片");
  } else {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}

//更新 開始和暫停的Icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = `<i class='fa fa-play fa-2x'>`;
  } else {
    play.innerHTML = `<i class='fa fa-pause fa-2x'>`;
  }
}

//更新 控制bar 和 時間
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  //抓取分鐘
  let mins = Math.floor(video.currentTime / 60); //無條件進位
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  //抓取秒
  let secs = Math.floor(video.currentTime % 60); //無條件進位
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

//設定影片時間到控制bar
function setVideoProgress() {
  console.log((progress.value * video.duration) / 100);
  //progress的值 乘上 影片總時間 除 100
  video.currentTime = (+progress.value * video.duration) / 100;
}

//停止影片
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

function handleFile() {
  let oFReader = new FileReader();
  let file = document.getElementById("inputFile").files[0];
  oFReader.readAsDataURL(file);
  oFReader.onloadend = function(oFRevent) {
    let src = oFRevent.target.result;
    video.src = src;
  };
}

//Event listener
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);

inputFile.addEventListener("change", handleFile);
