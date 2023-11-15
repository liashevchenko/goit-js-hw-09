import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// DOM elements
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button[data-start]');

// Variables
let timerId;
let selectedDate;

// Constants
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

// Functions
const convertMs = (ms) => {
  const days = Math.floor(ms / DAY);
  const hours = Math.floor((ms % DAY) / HOUR);
  const minutes = Math.floor(((ms % DAY) % HOUR) / MINUTE);
  const seconds = Math.floor((((ms % DAY) % HOUR) % MINUTE) / SECOND);

  return { days, hours, minutes, seconds };
};

const startTimer = () => {
  timerId = setInterval(counter, SECOND);
};

const setupFlatpickr = () => {
  flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onOpen() {
      startBtn.disabled = true;
    },
    onClose(selectedDates) {
      selectedDate = selectedDates[0];
      if (selectedDate <= Date.now()) {
        Notiflix.Notify.failure("Please choose a date in the future");
      } else {
        startBtn.disabled = false;
      }
    },
  });
};

const counter = () => {
  const remainingTime = selectedDate - Date.now();
  
  if (remainingTime <= 0) {
    clearInterval(timerId);
  } else {
    startBtn.disabled = true;
    markUp(remainingTime);
    console.log(remainingTime);
  }
};


const markUp = (remainingTime) => {
  const timeObj = convertMs(remainingTime);
  daysSpan.textContent = convertString(timeObj.days);
  hoursSpan.textContent = convertString(timeObj.hours);
  minutesSpan.textContent = convertString(timeObj.minutes);
  secondsSpan.textContent = convertString(timeObj.seconds);
};

const convertString = (item) => {
  return item.toString().padStart(2, '0');
};

// Initialization
startBtn.disabled = true;
startBtn.addEventListener("click", startTimer);
setupFlatpickr();
