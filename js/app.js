//Constants
const initCards = document.querySelectorAll('.game-card');
const restartButton = document.getElementById('restart');
const starFill = document.createElement('i');
const board = document.getElementById('board');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
const modalRestart = document.getElementById('modal-restart');
const movesSpan = document.getElementById('moves');
const modalStars = document.getElementById('modal-stars');
/* End of constants */

//Let variables
let modalMoves = document.getElementById('modal-moves');
let modalTime = document.getElementById('modal-time');
let starsDiv = document.getElementById('stars');
let timerSpan = document.getElementById('timer');
let matches = 0;
let moves = 0;
let timer = 0;
let stars = 3;
let lastTime;
/* End of Let variables */

//Array of cards
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
/* End of shuffle function */

//Penalty for extra moves
function moveChecker() {
    if(moves > 16 && moves <= 28){
        starsDiv.children[2].setAttribute('data-prefix', 'far');
        stars = 2;
    }
    else if (moves > 28 && moves <= 44 ){
        starsDiv.children[1].setAttribute('data-prefix', 'far');
        stars = 1;
    }
    else if (moves > 44){
        starsDiv.children[0].setAttribute('data-prefix', 'far');
        stars = 0;
    }
    else if(moves <= 16){
        starsDiv.children[0].setAttribute('data-prefix', 'fas');
        starsDiv.children[1].setAttribute('data-prefix', 'fas');
        starsDiv.children[2].setAttribute('data-prefix', 'fas');
        stars = 3;
    }
}
/* End of moveChecker function */

//Reveals a card and checks if it matches a revealed or not
function revealAndCheck(e) {
    if(e.target.getAttribute('class').includes('game-card')){
        showMoves();
        const target = e.target;

        const iconType = e.target.getAttribute('class').substr(17);
    
        //Checks if the card is unflipped and flips it if so
        if(target.getAttribute('class').includes('hidden'))
            target.setAttribute('class', target.getAttribute('class').replace(/hidden/gi, 'revealed'));
    
        target.firstElementChild.style.display = 'block';
        checkMatched(target);
        if(matches === 8){
            openModal();
        }
        checkUnmatched(target);
        showMoves();
        moveChecker();
    }
}
/* End of revealAndCheck funtion */

//Fils the board with random cards
function addRandomIcons() {
    matches = 0;
    moves = 0;
    moveChecker();
    shuffle(iconsArray);
    let newArray = [];

    for(card of initCards) {
        card.setAttribute('class', 'game-card revealed');
    }

    for(card of initCards) {
        let icon = iconsArray.pop();
        newArray.push(icon);
        card.innerHTML = icon;
        icon = card.firstElementChild;
        icon.setAttribute('class', icon.getAttribute('class') + ' fa-4x');
    }

    iconsArray = newArray;

    setTimeout(() => {
        for(card of initCards) {
            let icon = card.firstElementChild;
            icon.style.display = 'none';
            let iconClass = icon.getAttribute('class').split(' ');
            iconClass[3] = 'fa-2x';
            icon.setAttribute('class', iconClass[0]+' '+iconClass[1]+' '+iconClass[2]+' '+iconClass[3]);
            card.setAttribute('class', 'game-card hidden ' + icon.getAttribute('class').substr(7));
            hideCards(card);
        }
    }, 1000);
    
}
/* End of addRandomIcons funtion */

//Hides a passed card
function hideCards(card) {
        if(card.getAttribute('class').includes('revealed')){
            card.setAttribute('class', card.getAttribute('class').replace(/revealed/gi, 'hidden'));
            card.firstElementChild.style.display = 'none';
        }
        if(card.getAttribute('class').includes('false')){
            card.setAttribute('class', card.getAttribute('class').replace(/false/gi, 'hidden'));
            card.firstElementChild.style.display = 'none';
        }
}
/* End of hideCards funtion */

//Checks if the target matches a revealed card then makes them both blue if so
function checkMatched(target) {
    for(card of initCards) {
        const cardIcon = card.getAttribute('class').substr(17);
        if(card !== target && card.getAttribute('class') === target.getAttribute('class')){
            card.setAttribute('class', card.getAttribute('class').replace(/revealed/gi, 'true'));
            target.setAttribute('class', target.getAttribute('class').replace(/revealed/gi, 'true'));
            matches++;
            moves++;
            break;
        }
    }
}
/* End of checkMatched funtion */

//Checks if the target doesn't match a revealed card then makes them both red and flips them
function checkUnmatched(target) {
    for(card of initCards){
        if(card.getAttribute('class').includes('revealed') && card.getAttribute('class') !== target.getAttribute('class')){
            card.setAttribute('class', card.getAttribute('class').replace(/revealed/gi, 'false'));
            target.setAttribute('class', target.getAttribute('class').replace(/revealed/gi, 'false'));
            moves++;
            setTimeout(() => {
                hideCards(target);
                for(card of initCards){
                    hideCards(card);
                }
            }, 500);
        }
    }
}
/* End of checkUnmatched funtion */

//To be called when the timer needs to be updated
let timeStart =
    setInterval(() => {
        timer++;
        timerSpan.innerHTML = timer;
    },1000)
;
/* End of upTimer funtion */

//Open's the modal
function openModal() {
    clearInterval(timeStart);
    lastTime = timer;
    modalMoves.innerHTML = moves;
    modalTime.innerHTML = lastTime;
    modalStars.innerHTML = stars;
    modal.style.display = 'block';
}
/* End of openModal funtion */

//Closes the modal
function closeModal() {
    modal.style.display = 'none';
}
/* End of closeModal funtion */

//To be called when a move is made to display the current # of moves 
function showMoves() {
    movesSpan.innerHTML = moves;
}
/* End of showMoves funtion */

//Checks if there is a revealed card on the board
function thereIsRevealed(){
    for(card of initCards){
        if(card.getAttribute('class').includes('revealed'))
        return true;
    }
    return false;
}
/* End of thereIsRevealed funtion */


//Embeds the icons in the cards until revealed
document.addEventListener('DOMContentLoaded',() => {addRandomIcons();
    timer = 0;
    showMoves();
});

//Flips card and reveals icon
board.addEventListener('click', revealAndCheck);

//Reshuffles the cards and restarts the game
restartButton.addEventListener('click',() => {
    addRandomIcons(); 
    showMoves();
    timer = 0;
});

//Closes the modal when the 'x' is clicked
closeBtn.addEventListener('click', closeModal);

//Restarts the game from the modal
modalRestart.addEventListener('click', () => {
    closeModal();
    addRandomIcons(); 
    showMoves();
    timer = 0;
    timeStart =
    setInterval(() => {
        timer++;
        timerSpan.innerHTML = timer;
    },1000)
;
});
