const iconsArray = [
    '<i class="fas fa-rocket"></i>',
    '<i class="fas fa-bell"></i>',
    '<i class="fas fa-bug"></i>',
    '<i class="fas fa-chess-knight"></i>',
    '<i class="far fa-smile"></i>',
    '<i class="fas fa-dove"></i>',
    '<i class="fas fa-eye"></i>',
    '<i class="fas fa-leaf"></i>',
    // Repeat
    '<i class="fas fa-rocket"></i>',
    '<i class="fas fa-bell"></i>',
    '<i class="fas fa-bug"></i>',
    '<i class="fas fa-chess-knight"></i>',
    '<i class="far fa-smile"></i>',
    '<i class="fas fa-dove"></i>',
    '<i class="fas fa-eye"></i>',
    '<i class="fas fa-leaf"></i>'
];

const initCards = document.querySelectorAll('.game-card');

let matches = 0;

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

//Reveals a card and checks if it matches a revealed or not
function revealAndCheck(e) {
    const target = e.target;

    const iconType = target.getAttribute('class').substr(17);

    if(target.getAttribute('class') === 'game-card hidden '+iconType )
        target.setAttribute('class', 'game-card revealed '+iconType );

    target.firstElementChild.style.display = 'block';

    for(card of initCards) {
        if(card !== target && card.getAttribute('class') === 'game-card revealed ' + iconType){
            card.setAttribute('class', 'game-card true'+ ' ' + iconType);
            target.setAttribute('class', 'game-card true'+ ' ' + iconType);
            matches++;
        }
    }

}

//Embeds the icons in the cards until revealed
document.addEventListener('DOMContentLoaded', (e) => {
    shuffle(iconsArray);
    for(card of initCards) {
        let icon = iconsArray.pop();
        card.innerHTML = icon;
        icon = card.firstElementChild;
        icon.style.display = 'none';
        card.setAttribute('class', card.getAttribute('class') + ' ' + icon.getAttribute('class').substr(7));
    }
});
//Flips card and reveals icon
document.addEventListener('click', revealAndCheck);
