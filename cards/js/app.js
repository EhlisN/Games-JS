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

let start = document.querySelector('.button');
start.addEventListener('click', startGame);
let arrCards = document.querySelectorAll('.cards');
let nameCards = [
  'img1',
  'img2',
  'img3',
  'img4',
  'img5',
  'img6',
  'img7',
  'img8',
  'img1',
  'img2',
  'img3',
  'img4',
  'img5',
  'img6',
  'img7',
  'img8',
];
let arrRandom = [];
let randomCards = [];

let flag = true;
function startGame() {
  getRandomCards();
  document.querySelector('#text1').classList.remove('hide');
  document.querySelector('#text2').classList.remove('hide');
  if (flag) {
    flag = false;
    for (let i = 0; i < arrCards.length; i++) {
      arrCards[i].style.backgroundImage = `url(./img/${randomCards[i]}.png)`;
      arrCards[i].classList.add(randomCards[i]);
      arrCards[i].addEventListener('click', function () {
        openCard(arrCards[i]);
      });
    }
  }
  setTimeout(() => {
    for (let i = 0; i < arrCards.length; i++) {
      arrCards[i].style.backgroundImage = `url(img/cards_fon.png)`;
    }
  }, 3000);
}

function getRandomArr() {
  do {
    let num = Math.trunc(Math.random() * 16 + 0);
    if (arrRandom.indexOf(num) == -1) {
      arrRandom.push(num);
    }
  } while (arrRandom.length < 16);
}

function getRandomCards() {
  getRandomArr();
  for (let i = 0; i < arrRandom.length; i++) {
    randomCards.push(nameCards[arrRandom[i]]);
  }
}

let el1 = '';
let el2 = '';
let el2Name = '';
let el1Name = '';
let countCard = 0;
let countMove = 0;
let countMatch = 0;
let winner = document.querySelector('#win_window');

function openCard(el) {
  if (
    el.style.visibility != 'hidden' &&
    el.className.includes('check') == false &&
    el2 == ''
  ) {
    if (countCard == 0) {
      countCard++;
      el1Name = el.className.slice(6);
      el.classList.add('check');
      el.style.backgroundImage = `url(./img/${el1Name}.png)`;
      el1 = el;
      countMove++;
    } else if (countCard == 1) {
      el2Name = el.className.slice(6);
      el.style.backgroundImage = `url(./img/${el2Name}.png)`;
      el2 = el;
      setTimeout(() => {
        if (el1Name == el2Name) {
          el1.style.visibility = 'hidden';
          el2.style.visibility = 'hidden';
          countMatch++;
          document.querySelector('#info2').innerHTML = countMatch;
          if (countMatch == 8) {
            winner.classList.remove('hide');
            document.querySelector(
              '.result'
            ).textContent = `Ходов: ${countMove}`;
            winner.addEventListener('click', () => {
              window.location.reload(true);
            });
          }
        } else {
          el1.style.backgroundImage = `url(img/cards_fon.png)`;
          el2.style.backgroundImage = `url(img/cards_fon.png)`;
          el1.classList.remove('check');
        }
        el2 = '';
      }, 1000);
      countCard = 0;
    }
  }
  document.querySelector('#info1').innerHTML = countMove;
}
