// Burger-menu

let burger = document.querySelector('.burger__menu');
let open = false;

burger.addEventListener('click', () => {
  if (!open) {
    burger.classList.add('open');
    open = true;
  } else {
    burger.classList.remove('open');
    open = false;
  }
});

// Game

// create Container
let container = createEl('div', 'container');
document.querySelector('body').prepend(container);

function createEl(tag, classes) {
  let el = document.createElement(tag);
  el.classList.add(classes);
  return el;
}

// create field
let field = createEl('div', 'field');
container.append(field);
let empty = {
  val: 0,
  top: 0,
  left: 0,
};
let sizes = [];
let cells = [];
let cellSize = 0;
let count = 0;
let time = '00:00';
let timerStart;
let minutes = 0;
let hours = 0;
let size = 3;
let score = [];

let curSize = createEl('div', 'curSize');
curSize.innerHTML = `Frame size: ${size}x${size}`;
container.append(curSize);

let sizeBox = createEl('div', 'sizeBox');
sizeBox.innerHTML = 'Other sizes: ';
container.append(sizeBox);
for (let i = 3; i < 9; i++) {
  let sizeBtn = createEl('span', 'size');
  sizeBtn.innerHTML = `${i}x${i}`;
  sizeBtn.addEventListener('click', () => {
    size = i;
    curSize.innerHTML = `Frame size: ${size}x${size}`;
    startGame();
  });
  sizeBox.append(sizeBtn);
}

let counter = createEl('div', 'counter');
let timer = createEl('div', 'timer');
counter.innerHTML = `Moves: ${count}`;
timer.innerHTML = `Time: 00:00`;
container.prepend(timer);
container.prepend(counter);

// create button group
let stopEl = createEl('div', 'stop');
let stop = true;

// RESULT
let resultBtn = createEl('button', 'btn');
resultBtn.innerHTML = 'Result';
container.prepend(resultBtn);
resultBtn.addEventListener('click', () => {
  stopEl.innerHTML = '';
  stopBtn.classList.remove('gray');
  if (stop) {
    if (localStorage.score !== undefined) {
      score = JSON.parse(localStorage.score);
      for (let i = 0; i < score.length; i++) {
        stopEl.innerHTML += `Size: ${score[i].size}, moves: ${score[i].moves}, time: ${score[i].time} <br/>`;
      }
    } else {
      stopEl.innerHTML = 'No result!!!';
    }
    clearInterval(timerStart);
    stop = false;
    resultBtn.classList.add('gray');
    stopEl.style.display = 'flex';
  } else {
    stopEl.innerHTML = '';
    stop = true;
    resultBtn.classList.remove('gray');
    stopEl.style.display = 'none';
    timerStart = setInterval(() => {
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      time = `${hours < 10 ? '0' + hours : hours}:${
        minutes < 10 ? '0' + minutes : minutes
      }`;
      timer.innerHTML = `Time: ${time}`;
    }, 1000);
  }
});

// AUDIO
let audio = createEl('audio', 'player');
audio.src = './assets/sound/move2.mp3';
document.body.prepend(audio);
let sound = 'on';
let soundBtn = createEl('button', 'btn');
soundBtn.innerHTML = `Saung ${sound}`;
container.prepend(soundBtn);
soundBtn.addEventListener('click', () => {
  if (sound === 'on') {
    sound = 'off';
  } else {
    sound = 'on';
  }
  soundBtn.innerHTML = `Sound ${sound}`;
});

startGame();

// STOP
let stopBtn = createEl('button', 'btn');
stopBtn.innerHTML = 'Stop';
container.prepend(stopBtn);
stopBtn.addEventListener('click', () => {
  resultBtn.classList.remove('gray');
  if (stop) {
    clearInterval(timerStart);
    stop = false;
    stopBtn.classList.add('gray');
    stopEl.style.display = 'flex';
    stopEl.innerHTML = 'PAUSE';
  } else {
    stop = true;
    stopBtn.classList.remove('gray');
    stopEl.style.display = 'none';
    stopEl.innerHTML = '';
    timerStart = setInterval(() => {
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      time = `${hours < 10 ? '0' + hours : hours}:${
        minutes < 10 ? '0' + minutes : minutes
      }`;
      timer.innerHTML = `Time: ${time}`;
    }, 1000);
  }
});

// START
let startBtn = createEl('button', 'btn');
startBtn.innerHTML = 'Start';
container.prepend(startBtn);
startBtn.addEventListener('click', () => {
  stop = true;
  stopBtn.classList.remove('gray');
  resultBtn.classList.remove('gray');
  stopEl.innerHTML = '';
  stopEl.style.display = 'none';
  startGame(3);
});

// create start game
function startGame() {
  let numbers = [];
  for (let i = 0; i < size * size - 1; i++) {
    numbers.push(i);
  }
  cellSize = 100 / size;
  field.innerHTML = '';
  numbers = numbers.sort(() => Math.random() - 0.5);
  empty = {
    val: 0,
    top: 0,
    left: 0,
  };
  cells = [empty];
  count = 0;
  for (let i = 1; i < size * size; i++) {
    let cell = createEl('div', 'cell');
    let val = numbers[i - 1] + 1;
    cell.innerHTML = val;
    let left = i % size;
    let top = (i - left) / size;
    cell.style.left = `${left * cellSize}%`;
    cell.style.top = `${top * cellSize}%`;
    cell.style.width = `${(100 - 4 * size) / size}%`;
    cell.style.height = `${(100 - 4 * size) / size}%`;
    field.append(cell);

    cells.push({ left: left, top: top, elem: cell, val: val });

    cell.addEventListener('click', () => {
      move(i);
    });
  }

  field.prepend(stopEl);
  counter.innerHTML = `Moves: ${count}`;

  clearInterval(timerStart);

  minutes = 0;
  hours = 0;
  timer.innerHTML = `Time: 00:00`;

  timerStart = setInterval(() => {
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    time = `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }`;
    timer.innerHTML = `Time: ${time}`;
  }, 1000);
}

// create move cells
function move(ind) {
  let cell = cells[ind];
  let coordLeft = Math.abs(empty.left - cell.left);
  let coordTop = Math.abs(empty.top - cell.top);

  if (coordLeft + coordTop > 1) {
    return;
  }

  if (sound === 'on') audio.play();
  count++;
  counter.innerHTML = `Moves: ${count}`;

  cell.elem.style.left = `${empty.left * cellSize}%`;
  cell.elem.style.top = `${empty.top * cellSize}%`;

  let emptyLeft = empty.left;
  let emptyTop = empty.top;
  empty.left = cell.left;
  empty.top = cell.top;
  cell.left = emptyLeft;
  cell.top = emptyTop;

  let isFinished = cells.every((cell) => {
    return cell.val === cell.top * size + cell.left;
  });

  if (isFinished) {
    clearInterval(timerStart);
    stopEl.innerHTML = `Hooray! You solved the puzzle in ${time} and ${count} moves!`;

    stopEl.style.display = 'flex';

    // Добавляем в score новый результат
    score.push({ size: `${size}x${size}`, moves: count, time: time });
    score.sort(function (a, b) {
      if (a.size !== b.size) return b.size - a.size;
      else if (a.moves !== b.moves) return a.moves - b.moves;
      else return a.time.split(':').join('') - b.time.split(':').join('');
    });
    if (score.length > 10) score.pop();
    localStorage.score = JSON.stringify(score);
  }
}
