// Описано у документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Імпор бібліотеки повідомлень
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// ініціалізація вузлів
const dataTimeInputEl = document.querySelector('#datetime-picker');
const dataStartBtnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

// змінна для запису обраної дати в мілісекундах
let finishTimeCount = 0;
// записуємо час, що відраховується
let countDown = null;
// записуємо різницю між поточним та відраховуємо (наші показання секундоміра)
let difference = 0;

updateCountValue();

flatpickr(dataTimeInputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    // наводимо обрану дату в мілісекунди та записуємо у змінну
    finishTimeCount = selectedDates[0].getTime();

    dataStartBtnEl.disabled = false;
    // якщо обрана дата вже пройшла, то кнопка старт не активна, виводимо попередження
    if (finishTimeCount < Date.now()) {
      dataStartBtnEl.setAttribute('disabled', true);
      Notify.failure('Please choose a date in the future');
    }
  },
});

// додаємо слухача на кнопку старт і запускаємо функцію відліку
dataStartBtnEl.addEventListener('click', onStartCouter);

// для запуску та запису часу, що відраховується
function onStartCouter() {
  countDown = setInterval(updateCountValue, 1000);
  dataStartBtnEl.setAttribute('disabled', true);
  Notify.success('The countdown has begun!');
}

// розрахувати різницю в часі та виведення на сторінку
function updateCountValue() {
  const nowTime = new Date().getTime();
  difference = finishTimeCount - nowTime;

  if (difference < 0) {
    dataStartBtnEl.setAttribute('disabled', true);
    clearInterval(countDown);
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(difference);

  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// функція конвертації дати
function convertMs(ms) {
  // Кількість мілісекунд на одиницю часу
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Решта днів
  const days = Math.floor(ms / day);
  // Решта годиг
  const hours = Math.floor((ms % day) / hour);
  // Решта минут
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Решта секунд
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Приймає число, призводить до рядка і додає на початок 0 якщо число менше 2-х знаків
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}