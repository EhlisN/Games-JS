let start = document.querySelector('.button');
start.addEventListener('click', startGame);
let arrCards = document.querySelectorAll('.cards');
let nameCards = ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png', 'img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png'];
console.log(arrCards);
let arrRandom = [];
let gameCards = [];
getRandomArr();

let flag = true;
function startGame() {
    document.querySelector('#text1').classList.remove('hide');
    document.querySelector('#text2').classList.remove('hide');
    if(flag) {
        flag = false;
        for(let i = 0; i < arrCards.length; i++) {
            let card = createEl(nameCards[i], arrRandom[i]);
            gameCards.push(card);
        }
    }
    setTimeout(() => {
        for(let i = 0; i < gameCards.length; i++) {
            gameCards[i].style.opacity = '0';
        }
    }, 1000)
    addClick(gameCards);   
}

function createEl(src, num) {
    let el = document.createElement('img');
    el.src = `img/${src}`;
    arrCards[num].append(el);
    return el;
}

function getRandomArr() {
    do{
        let num = Math.trunc(Math.random() * 16 + 0);
        if(arrRandom.indexOf(num) == -1) {
            arrRandom.push(num);
        }
    } while(arrRandom.length < 16)
}

let countCard = 0;
let el1 = '';
let el2 = '';
let countMove = 0;
let countMatch = 0;

function addClick(arr) {
    for(let el of arr) {
        el.addEventListener('click', function() {openCard(el)});
    }
}

function openCard(el) {
    console.log('test');
    if(el.parentNode.style.opacity != '0' && el.style.opacity != '10' && el2 == '') {
    if(countCard == 0) {
        countCard++;
        el1 = el;
        el.style.opacity = '10';
        countMove++;
    } else if(countCard == 1) {
        el2 = el;
        el2.style.opacity = '10';
        setTimeout(() => {
            if(el2.src == el1.src) {
                el1.parentNode.style.opacity = '0';
                el2.parentNode.style.opacity = '0';
                el2.removeEventListener('click', function() {openCard(el)});
                el1.removeEventListener('click', function() {openCard(el1)});
                countMatch++;
                document.querySelector('#info2').innerHTML = countMatch;
                if(countMatch == 8) {
                    document.querySelector('#win_window').classList.remove('hide');
                }
            } else {
                el1.style.opacity = '0';
                el2.style.opacity = '0';
            }
            el2 = '';
        }, 1000)
        countCard = 0;
    }    
    }
    document.querySelector('#info1').innerHTML = countMove;                
    console.log(el1);
    console.log(countCard);
}

