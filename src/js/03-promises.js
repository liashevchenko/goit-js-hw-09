import Notiflix from 'notiflix';

const delayInp = document.querySelector('input[name="delay"]');
const stepInp = document.querySelector('input[name="step"]');
const amountInp = document.querySelector('input[name="amount"]');
const form = document.querySelector('form');

form.addEventListener('submit', submit);

function submit(event) {
  event.preventDefault();
  const amount = parseInt(amountInp.value, 10);
  const step = parseInt(stepInp.value, 10);
  const delay = parseInt(delayInp.value, 10);

  for (let i = 0; i <= amount; i++) {
    setTimeout(() => {
      const currentDelay = i * step + delay;
      createPromise(i+1, currentDelay);
    }, i * step);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        resolve({ position, delay });
      } else {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        reject({ position, delay });
      }
    }, delay);
  });
}


createPromise(2, 1500)
  .then((value) => {
   console.log(value);
  })
  .catch((value) => {
    console.log(value);
  });