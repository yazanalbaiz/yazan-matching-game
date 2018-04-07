const initCards = document.querySelectorAll('.game-card');
const restartButton = document.getElementById('restart');
const starFill = document.createElement('i');
const board = document.getElementById('board');

let starsDiv = document.getElementById('stars');
let matches = 0;
let moves = 0;

let iconsArray = [
    '<i class="fab fa-firefox"></i>',
    '<i class="fab fa-react"></i>',
    '<i class="fab fa-linux"></i>',
    '<i class="fab fa-empire"></i>',
    '<i class="fab fa-github"></i>',
    '<i class="fab fa-pied-piper-alt"></i>',
    '<i class="fab fa-rebel"></i>',
    '<i class="fab fa-reddit-alien"></i>',
    // Repeat
    '<i class="fab fa-firefox"></i>',
    '<i class="fab fa-react"></i>',
    '<i class="fab fa-linux"></i>',
    '<i class="fab fa-empire"></i>',
    '<i class="fab fa-github"></i>',
    '<i class="fab fa-pied-piper-alt"></i>',
    '<i class="fab fa-rebel"></i>',
    '<i class="fab fa-reddit-alien"></i>'
];


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function moveChecker() {
    if(moves > 16 && moves <= 28){
        starsDiv.children[2].setAttribute('data-prefix', 'far');
    }
    else if (moves > 28 && moves <= 44 ){
        starsDiv.children[1].setAttribute('data-prefix', 'far');
    }
    else if (moves > 44){
        starsDiv.children[0].setAttribute('data-prefix', 'far');
    }
    else if(moves <= 16){
        starsDiv.children[0].setAttribute('data-prefix', 'fas');
        starsDiv.children[1].setAttribute('data-prefix', 'fas');
        starsDiv.children[2].setAttribute('data-prefix', 'fas');
    }
}

//Reveals a card and checks if it matches a revealed or not
function revealAndCheck(e) {
    if(e.target.getAttribute('class').includes('game-card')){
        moves++;
        moveChecker();
    }

    const target = e.target;

    const iconType = e.target.getAttribute('class').substr(17);

    //Checks if the card is unflipped and flips it if so
    if(target.getAttribute('class').includes('hidden'))
        target.setAttribute('class', target.getAttribute('class').replace(/hidden/gi, 'revealed'));

    target.firstElementChild.style.display = 'block';

    checkMatched(target);
    
}

function addRandomIcons() {
    moves = 0;
    moveChecker();
    shuffle(iconsArray);
    let newArray = [];
    for(card of initCards) {
        let icon = iconsArray.pop();
        card.innerHTML = icon;
        newArray.push(icon);
        icon = card.firstElementChild;
        icon.style.display = 'none';
        icon.setAttribute('class', icon.getAttribute('class') + ' fa-2x');
        card.setAttribute('class', 'game-card hidden ' + icon.getAttribute('class').substr(7));
        hideCards(card);
    }
    iconsArray = newArray;
}

function hideCards(card) {
        if(card.getAttribute('class').includes('revealed')){
            card.setAttribute('class', card.getAttribute('class').replace(/revealed/gi, 'hidden'));
            card.firstElementChild.style.display = 'none';
        }
        if(card.getAttribute('class').includes('true')){
            card.setAttribute('class', card.getAttribute('class').replace(/true/gi, 'hidden'));
            card.firstElementChild.style.display = 'none';
        }
}

function checkMatched(target) {
    for(card of initCards) {
        const cardIcon = card.getAttribute('class').substr(17);
        if(card !== target && card.getAttribute('class') === target.getAttribute('class')){
            card.setAttribute('class', card.getAttribute('class').replace(/revealed/gi, 'true'));
            target.setAttribute('class', target.getAttribute('class').replace(/revealed/gi, 'true'));
            matches++;
            break;
        }
    }
}

function checkUnmatched(target) {
    for(card of initCards){
        if(card.getAttribute('class').includes('revealed') && card.getAttribute('class') !== target.getAttribute('class')){
            hideCards(card);
            hideCards(target);
        }
    }
}

//Embeds the icons in the cards until revealed
document.addEventListener('DOMContentLoaded', addRandomIcons);

//Flips card and reveals icon
board.addEventListener('click', revealAndCheck);

restartButton.addEventListener('click',addRandomIcons);

