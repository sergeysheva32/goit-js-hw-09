import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

const inputEl = document.getElementById('datetime-picker');
const countdownBtn = document.querySelector('button[data-start]');
const $days = document.querySelector('span[data-days]');
const $hours = document.querySelector('span[data-hours]');
const $minutes = document.querySelector('span[data-minutes]');
const $seconds = document.querySelector('span[data-seconds]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
};

let timerId = null;

countdownBtn.addEventListener('click', countdownBtnHandler);
inputEl.addEventListener('input', countDownBtnState);

flatpickr('#datetime-picker', options);

function countdownBtnHandler() {
    countdownBtn.disabled = true;

    timerId = setInterval(countDown, 1000);
}

function countDown() {
    const inpValue = inputEl.value;
    const currentDate = new Date();
    const targetDate = new Date(inpValue);
    const diffDate = targetDate - currentDate;

    if (diffDate <= 0) {
        clearInterval(timerId);
    }

    const days = diffDate > 0 ? Math.floor(diffDate / 1000 / 60 / 60 / 24) : 0;
    const hours = diffDate > 0 ? Math.floor(diffDate / 1000 / 60 / 60) % 24 : 0;
    const minutes = diffDate > 0 ? Math.floor(diffDate / 1000 / 60) % 60 : 0;
    const seconds = diffDate > 0 ? Math.floor(diffDate / 1000) % 60 : 0;


    $days.textContent = days < 10 ? '0' + days : days;
    $hours.textContent = hours < 10 ? '0' + hours : hours;
    $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
    $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
}

function countDownBtnState() {
    const currentDate = new Date();
    const targetDate = new Date(inputEl.value);

    countdownBtn.disabled = true;

    if (currentDate > targetDate) {
        countdownBtn.disabled = true;
        Notiflix.Notify.failure('Chose a date in the future');
    } else {
        countdownBtn.disabled = false;
        clearInterval(timerId);
        Notiflix.Notify.success('Correct date');
    }
}

countDownBtnState();