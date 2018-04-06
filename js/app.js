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


document.addEventListener('click', (e) => {
    if(e.target.getAttribute('class') === 'game-card-hidden')
        e.target.setAttribute('class', 'game-card-revealed');
});