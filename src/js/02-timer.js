import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const startEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let newSelectedDate = new Date();
const INTERVAL = 1000;

Report.info('Info', 'Please choose a date to start a coundown!', 'Okay');

startEl.addEventListener('click', handleStartButtonClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    newSelectedDate = selectedDates[0];
    setAttributeDisabled();
    correctDateSelect();
  },
};

flatpickr('input#datetime-picker', options);

function setAttributeDisabled() {
  startEl.setAttribute('disabled', true);
}

function correctDateSelect() {
  if (newSelectedDate < new Date()) {
    Report.failure('Failure', 'Please choose a date in the future!', 'Ok');
    return;
  }
  startEl.removeAttribute('disabled');
}

function handleStartButtonClick() {
  startEl.setAttribute('disabled', true);
  const intervalId = setInterval(() => {
    if (newSelectedDate < new Date()) {
      clearInterval(intervalId);
      Report.success(
        'Success',
        '"Do not try to become a person of success but try to become a person of value." <br/><br/>- Albert Einstein',
        'Ok'
      );
      return;
    }
    setTimeRemaining(convertMs(newSelectedDate - new Date()));
  }, INTERVAL);
}

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

function setTimeRemaining({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
