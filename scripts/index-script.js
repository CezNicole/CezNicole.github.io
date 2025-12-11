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


// Cybersecurity Projects - Modal Functionality
// const btnViewCybersecurityProject1 = document.getElementById('btnCybersecurityProject1');
// btnViewCybersecurityProject1.addEventListener('click', (event) =>{
//     event.preventDefault();
//     document.getElementById('CSProject1').classList.add('visible');
// })

// const btnViewCybersecurityProject2 = document.getElementById('btnCybersecurityProject2');
// btnViewCybersecurityProject2.addEventListener('click', (event) =>{
//     event.preventDefault();
//     document.getElementById('CSProject2').classList.add('visible');
// })

// const btnClose = document.querySelector('.close');
// btnClose.addEventListener('click', (event) => {
//     event.preventDefault();
//     document.querySelector('.modal').classList.remove('visible');
// })

function openModal(id){
    document.getElementById(id).classList.add('visible');
}

function closeModal(id){
    document.getElementById(id).classList.remove('visible');
}

document.querySelectorAll("[data-modal]").forEach(btnViewDetails => {
    btnViewDetails.addEventListener('click', (event) => {
        event.preventDefault();
        const modalId = btnViewDetails.dataset.modal; //HTML5: Gets data-modal value
        openModal(modalId);

        // hide <body> scroll functionality
        document.body.classList.add('overflow-hidden');
    })    
});

document.querySelectorAll(".close[data-modal]").forEach(btnClose => {
    btnClose.addEventListener('click', (event) => {
        event.preventDefault();
        const modalId = btnClose.dataset.modal; //HTML5: Gets data-modal value
        closeModal(modalId);

        // make <body> scroll functionality visible
        document.body.classList.remove('overflow-hidden');
    })
})