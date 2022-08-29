// ініціалізація
const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

// робимо кнопку стоп не активною
stopBtn.setAttribute('disabled', true);

// генератор випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// слухачі подій на кнопки
startBtn.addEventListener('click', onClickStartBtn);
stopBtn.addEventListener('click', onClickStopBtn);

//
function onClickStartBtn() {
  timerId = setInterval(() => {
    // викликаємо функцію getRandomHexColor() і записуємо значення в randomColor
    const randomColor = getRandomHexColor();
    // привласнюємо значення кольору body
    bodyEl.style.backgroundColor = randomColor;
  }, 1000);
  stopBtn.removeAttribute('disabled');
  startBtn.setAttribute('disabled', true);
}

function onClickStopBtn() {
  clearInterval(timerId);
  stopBtn.setAttribute('disabled', true);
  startBtn.removeAttribute('disabled');
}
