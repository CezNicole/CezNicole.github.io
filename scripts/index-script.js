const btnContact = document.querySelector('.main__btnContact');
btnContact.addEventListener('click', (event) => {
    event.preventDefault();
    window.location = 'mailto:cezcomia@gmail.com';
})