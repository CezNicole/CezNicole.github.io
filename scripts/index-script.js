const btnContact = document.getElementById('btnContactMe');
btnContact.addEventListener('click', (event) => {
    event.preventDefault();
    window.location = 'mailto:cezcomia@gmail.com';
})

const btnViewFeaturesNitro = document.getElementById('btnViewNitro');
btnViewFeaturesNitro.addEventListener('click', (event) => {
    event.preventDefault();
    window.open('pages/coffee-shop-home.html', '_blank');
})

const btnViewFeaturesTravelSite = document.getElementById('btnViewTravelSite');
btnViewFeaturesTravelSite.addEventListener('click', (event) =>{
    event.preventDefault();
    window.open('pages/travel-site-home.html', '_blank');
})

const btnViewFeaturesBandSite = document.getElementById('btnViewBandSite');
btnViewFeaturesBandSite.addEventListener('click', (event) => {
    event.preventDefault();
    window.open('pages/band-site-biography.html', '_blank');
})

const btnViewCybersecurityProject1 = document.getElementById('btnCybersecurityProject1');
btnViewCybersecurityProject1.addEventListener('click', (event) =>{
    event.preventDefault();
    document.querySelector('.modal').classList.add('visible');
})