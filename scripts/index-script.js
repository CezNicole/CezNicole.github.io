import {getProjects} from "./index-api.js";

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


// Refactor code for a dynamic Portfolio page
const skills = [
    'Microsoft Azure AZ-900 Fundamentals',
    'AWS Certified Cloud Practitioner',
    'Google Foundations of Cybersecurity',
    'HTML',
    'CSS/SCSS',
    'JavaScript',
    '.NET',
    'Git',
    'Basic SQL Queries',
    'Incident Response (ServiceNow)',
    'Network Traffic Analysis (Wireshark)',
    'Log Analysis in SIEM Environments',
];

const divSkillsContainer = document.querySelector('.section-cards__container--skills');

skills.forEach(skill => {
    const divSkills = document.createElement('div');
    divSkills.classList.add('section-cards__skills');
    divSkills.innerHTML = skill;

    divSkillsContainer.appendChild(divSkills);
})


// Refactor code to load and render Cybersecurity Projects
let cybersecurityProjects = [];

async function loadCybersecurityProjects(){
    try {
        const response = await getProjects();
        cybersecurityProjects = response;
        
        // WIP
        console.log(cybersecurityProjects);
        
        return cybersecurityProjects;
    } catch (error) {
        console.log('Error loading Cybersecurity Projects:', error)        
    }

}

loadCybersecurityProjects();


// Cybersecurity Projects - Modal Functionality
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
