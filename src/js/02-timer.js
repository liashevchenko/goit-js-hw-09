import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button[data-start]');
let timerId; 
let selectedDate;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.disabled = true;
startBtn.addEventListener("click", () => {
timerId = setInterval(counter, 1000);});

const calendar = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen() {
  startBtn.disabled = true;
  },
  onClose([selectedDates]) {
    const currentDate = Date.now();
    selectedDate = calendar.selectedDates;
    if (selectedDate <= currentDate) {
      return Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      startBtn.disabled = false;
    }
  },
});

function counter() {
  const remainingTime = selectedDate - Date.now();
  if (remainingTime <= 0) {
    clearInterval(timerId);
    markUp(0);
  } else {
    startBtn.disabled = true;
    markUp(remainingTime);
  }
}

function markUp(remainingTime) {
  const timeObj = convertMs(remainingTime);
  daysSpan.textContent = convertString(timeObj.days)
  hoursSpan.textContent = convertString(timeObj.hours)
  minutesSpan.textContent = convertString(timeObj.minutes)
  secondsSpan.textContent = convertString(timeObj.seconds)
}

function convertString(item) {
  return item.toString().padStart(2, '0');
}