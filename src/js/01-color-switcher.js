
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

stopBtn.disabled = true;

startBtn.addEventListener('click', startBtnHandler);
stopBtn.addEventListener('click', stopBtnHandler);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function startBtnHandler() {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    timerId = setInterval(() => {
        let color = getRandomHexColor();

        document.body.style.backgroundColor = color;
    }, 1000);
}

function stopBtnHandler() {
    startBtn.disabled = false;
    stopBtn.disabled = true;

    clearInterval(timerId);
}