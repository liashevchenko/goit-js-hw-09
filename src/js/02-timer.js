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

const calendar = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    selectedDate = calendar.selectedDates[0];

    if (selectedDate <= currentDate) {
     return  Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener("click", () => {
        // Recalculate remaining time inside the click event
        timerId = setInterval(counter, 1000);
      });
    }
  },
});

function counter() {
  const remainingTime = selectedDate - new Date();
  startBtn.disabled = true;
  const timeObj = convertMs(remainingTime);
  daysSpan.textContent = timeObj.days.toString().padStart(2, '0');
  hoursSpan.textContent = timeObj.hours.toString().padStart(2, '0');
  minutesSpan.textContent = timeObj.minutes.toString().padStart(2, '0');
  secondsSpan.textContent = timeObj.seconds.toString().padStart(2, '0');
  
  if (remainingTime <= 0) {
    clearInterval(timerId);
  }
}
