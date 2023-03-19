const startEl = document.querySelector('button[data-start]');
const stoptEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

startEl.addEventListener('click', handleStart);
stoptEl.addEventListener('click', handleStop);

function handleStart() {
  toggleAttributeDisabled();
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function handleStop() {
  toggleAttributeDisabled();
  clearInterval(timerId);
}

function toggleAttributeDisabled() {
  startEl.toggleAttribute('disabled');
  stoptEl.toggleAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
