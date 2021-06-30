const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;

startBtn.addEventListener('click', e => {
  e.preventDefault();

  screens[0].classList.add('up');
});

timeList.addEventListener('click', e => {
  if (e.target.classList.contains('time-btn')) {
    screens[1].classList.add('up');
    time = parseInt(e.target.getAttribute('data-time'));
    startGame();
  }
});

function startGame() {
  setInterval(decreaseTimer, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTimer() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const { width, height } = board.getBoundingClientRect();

  const size = getRandomNumber(10, 60);
  const color = getRandomColor();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add('circle');
  circle.style.background = color;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`; 
  circle.style.left = `${x}px`;

  board.append(circle);
}

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function getRandomColor() {
  const R = getRandomNumber(0, 255);
  const G = getRandomNumber(0, 255);
  const B = getRandomNumber(0, 255);

  return `rgb(${R}, ${G}, ${B})`;
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
