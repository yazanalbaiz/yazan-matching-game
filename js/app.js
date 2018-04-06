document.addEventListener('click', (e) => {
    if(e.target.getAttribute('class') === 'game-card-hidden')
        e.target.setAttribute('class', 'game-card-revealed');
});