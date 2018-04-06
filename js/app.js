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




document.addEventListener('click', (e) => {
    if(e.target.getAttribute('class') === 'game-card-hidden')
        e.target.setAttribute('class', 'game-card-revealed');
});