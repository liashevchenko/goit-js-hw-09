const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}



function onClickStart() {
    timerId = setInterval(() => document.body.style.backgroundColor = getRandomHexColor(), 1000);
    startBtn.disabled = true;
}

function onClickStop() {
    clearInterval(timerId);
    startBtn.disabled = false;
}

startBtn.addEventListener("click", onClickStart);
stopBtn.addEventListener("click", onClickStop);