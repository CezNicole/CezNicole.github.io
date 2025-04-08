const btnContact = document.getElementById('btnContactMe');
btnContact.addEventListener('click', (event) => {
    event.preventDefault();
    window.location = 'mailto:cezcomia@gmail.com';
})

const btnViewFeatures = document.getElementById('btnViewFeatures');
btnViewFeatures.addEventListener('click', (event) => {
    event.preventDefault();
    window.open('pages/coffee-shop-home.html', '_blank');
})