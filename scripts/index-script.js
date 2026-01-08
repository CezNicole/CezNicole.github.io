import {getProjectDetails, getProjects} from "./index-api.js";

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
let cybersecurityProjectDetails = [];

async function loadCybersecurityProjects(){
    try {
        const response = await getProjects();
        cybersecurityProjects = response;
        
        const projectWithIds = cybersecurityProjects.map((project, index) =>{
            return{
                id: `CSProject${index + 1}`,
                ...project
            }
        })
        console.log(projectWithIds);
        
        renderAllProjects(projectWithIds);

        return projectWithIds;
    } catch (error) {
        console.log('Error loading Cybersecurity Projects:', error)        
    }

}

loadCybersecurityProjects();


function renderAllProjects(projects){
    const portfolioContainer = document.querySelector('.section-cards__container--portfolio');

    projects.forEach(project => {
        const divProjectDetails = document.createElement('div');
        divProjectDetails.classList.add('project-details');
        divProjectDetails.classList.add('project-details__cybersecurity');
    
        const projectTitle = document.createElement('h4');
        projectTitle.classList.add('project-title');
        projectTitle.innerHTML = project.title;
    
        const skillsList = document.createElement('ul');
        skillsList.classList.add('highlighted-skills__list');
    
        project.skills.forEach(skill => {
            const highlightedSkill = document.createElement('li');
            highlightedSkill.classList.add('highlighted-skills');
            highlightedSkill.innerHTML = skill;

            skillsList.appendChild(highlightedSkill);
        })

        const projectDesc = document.createElement('p');
        projectDesc.classList.add('project-details__desc');
        projectDesc.innerHTML = project.description;

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('buttons__container');

        const btnViewDetails = document.createElement('button');
        btnViewDetails.classList.add('buttons__project');
        btnViewDetails.dataset.modal = project.id;
        btnViewDetails.innerHTML = 'View Details';

        
        // WIP - bug: clicking the button doesn't show project details
        const modal = document.getElementById(project.id);
        const btnClose = modal.querySelector('.close');
        modalFunctionality(btnViewDetails, btnClose, project.id);
        
        
        divProjectDetails.appendChild(projectTitle);
        divProjectDetails.appendChild(skillsList);
        divProjectDetails.appendChild(projectDesc);

        btnContainer.appendChild(btnViewDetails);
        divProjectDetails.appendChild(btnContainer);

        portfolioContainer.appendChild(divProjectDetails);
    })
    return projects;
}


// Cybersecurity Projects - Modal Functionality
function openModal(id){
    document.getElementById(id).classList.add('visible');
}

function closeModal(id){
    document.getElementById(id).classList.remove('visible');
}

// document.querySelectorAll("[data-modal]").forEach(btnViewDetails => {
//     btnViewDetails.addEventListener('click', (event) => {
//         event.preventDefault();
//         const modalId = btnViewDetails.dataset.modal; //HTML5: Gets data-modal value
//         openModal(modalId);

//         // hide <body> scroll functionality
//         document.body.classList.add('overflow-hidden');
//     })    
// });

// document.querySelectorAll(".close[data-modal]").forEach(btnClose => {
//     btnClose.addEventListener('click', (event) => {
//         event.preventDefault();
//         const modalId = btnClose.dataset.modal; //HTML5: Gets data-modal value
//         closeModal(modalId);

//         // make <body> scroll functionality visible
//         document.body.classList.remove('overflow-hidden');
//     })
// })


// Refactor: btnViewDetails modal functionality
function modalFunctionality(openBtn, closeBtn, modalId){
    openBtn.addEventListener('click', (event) => {
        event.preventDefault();
        openModal(modalId);

        // hide <body> scroll functionality
        document.body.classList.add('overflow-hidden');
    });

    closeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        closeModal(modalId);

        // make <body> scroll functionality visible
        document.body.classList.remove('overflow-hidden');
    })
}


// Refactor: Load and Render Cybersecurity Project Details upon button click
async function loadProjectDetails(){
    try {
        const response = await getProjectDetails();
        cybersecurityProjectDetails = response;
        
        const projectDetailsWithIds = cybersecurityProjectDetails.map((project, index) =>{
            return{
                id: `CSProject${index + 1}`,
                ...project
            }
        })
        console.log(projectDetailsWithIds);
        
        renderAllDetails(projectDetailsWithIds);

        return projectDetailsWithIds;
    } catch (error) {
        console.log('Error loading Cybersecurity Project Details:', error)        
    }
}

// loadProjectDetails() 
        

// To-do: Display role": "Cybersecurity Analyst" for ALL PROJECTS (below Overview)




function renderAllDetails(projectDetails){
    projectDetails.forEach(detail => {
        const parentContainer = document.createElement('div');
        parentContainer.classList.add('modal');

        const contentContainer = document.createElement('div');
        contentContainer.classList.add('modal__content');

        const btnClose = document.createElement('button');
        btnClose.classList.add('close');
        btnClose.dataset.modal = detail.id;
        btnClose.textContent = 'X';
    })
}