import Notiflix from 'notiflix';

const form = document.querySelector('form');

form.addEventListener('submit', submit);

function submit(event) {
  event.preventDefault();
  const amount = parseInt(event.target.amount.value, 10);
  const step = parseInt(event.target.step.value, 10);
  const delay = parseInt(event.target.delay.value, 10);

  for (let i = 0; i < amount; i++) {
      const currentDelay = i * step + delay;
    createPromise(i + 1, currentDelay).then((value) => {
  console.log(value);
  })
  .catch((value) => {
    console.log(value);
  });
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

