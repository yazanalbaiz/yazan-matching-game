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

    const iconType = e.target.getAttribute('class').substr(17);

    //Checks if the card is unflipped and flips it if so
    if(target.getAttribute('class').includes('hidden'))
        target.setAttribute('class', target.getAttribute('class').replace(/hidden/gi, 'revealed'));

    target.firstElementChild.style.display = 'block';

    for(card of initCards) {
        const cardIcon = card.getAttribute('class').substr(17);
        if(card !== target && card.getAttribute('class') === target.getAttribute('class')){
            card.setAttribute('class', card.getAttribute('class').replace(/revealed/gi, 'true'));
            target.setAttribute('class', target.getAttribute('class').replace(/revealed/gi, 'true'));
            matches++;
            continue;
        }
        // else{
        //     card.setAttribute('class', card.getAttribute('class').replace('revealed', 'hidden'));
        //     target.setAttribute('class', target.getAttribute('class').replace('revealed', 'hidden'));
        //     continue;
        // }
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
        icon.setAttribute('class', icon.getAttribute('class') + ' fa-2x');
        card.setAttribute('class', card.getAttribute('class') + ' ' + icon.getAttribute('class').substr(7));
    }
});
//Flips card and reveals icon
document.addEventListener('click', revealAndCheck);
