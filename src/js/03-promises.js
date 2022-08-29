import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');
const delayEl = document.querySelector('[name=delay]');
const stepEl = document.querySelector('[name=step]');
const amountEl = document.querySelector('[name=amount]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  // resolve(value) - функція виклику під час успішної операції. Переданий їй аргумент буде значення виконаного промісу.
  // reject(error) - функція виклику у разі помилки. Переданий їй аргумент буде значення відхиленого промісу.

  // повертає один проміс, який виконується або відхиляється через delay часу
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay });
    } else {
      // Reject
      reject({ position, delay });
    }
  });
}

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  // вимкнути перезавантаження
  event.preventDefault();

  let delay = delayEl.value;
  const step = stepEl.value;
  const amount = amountEl.value;

  for (let i = 1; i <= amount; i++) {
    delay += step;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
  }
}