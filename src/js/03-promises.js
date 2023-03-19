import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');
const buttonEl = document.querySelector('button');

let delayInput = null;
let stepInput = null;
let amountInput = null;

formEl.addEventListener('input', handleInput);
buttonEl.addEventListener('click', handleButtonClick);

setAttributeDisabled();
function setAttributeDisabled() {
  buttonEl.setAttribute('disabled', true);
}

function handleInput(event) {
  const { delay, step, amount } = event.currentTarget.elements;
  delayInput = Number(delay.value);
  stepInput = Number(step.value);
  amountInput = Number(amount.value);
  if (delayInput && stepInput && amountInput) {
    buttonEl.removeAttribute('disabled');
  }
}

function handleButtonClick(event) {
  event.preventDefault();
  for (let i = 1; i <= amountInput; i += 1) {
    delayInput += stepInput;

    createPromise(i, delayInput)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    setAttributeDisabled();
    formEl.reset();
  }
  return;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
