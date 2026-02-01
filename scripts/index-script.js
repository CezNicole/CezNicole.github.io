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
    divSkills.textContent = skill;

    divSkillsContainer.appendChild(divSkills);
})


// Refactor code to load and render Cybersecurity Projects
let cybersecurityProjects = [];

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
        
        // console.log(projectWithIds);
        
        // renderAllProjects(projectWithIds);
        renderProjectCards(projectWithIds);

        return projectWithIds;

    } catch (error) {
        console.log('Error loading Cybersecurity Projects:', error)        
    }
}

cybersecurityProjects = await loadCybersecurityProjects();


function createProjectCard(project){
    const card = document.createElement('div');
    card.classList.add('project-details', 'project-details__cybersecurity');

    const projectName = document.createElement('h4');
    projectName.classList.add('project-title');
    projectName.textContent = project.projectName;

    const skillsList = createSkillsList(project.skills);

    const projectDesc = document.createElement('p');
    projectDesc.classList.add('project-details__desc');
    projectDesc.textContent = project.description;

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('buttons__container');

    const btnViewDetails = document.createElement('button');
    btnViewDetails.classList.add('buttons__project');
    btnViewDetails.dataset.modal = project.id;
    btnViewDetails.textContent = 'View Details';

    btnViewDetails.addEventListener('click', (event) => {
        event.preventDefault();
        openModal(project.id);
    })

    card.append(projectName, skillsList, projectDesc, btnContainer, btnViewDetails);

    return card;
}

function createSkillsList(skills){
    const skillsList = document.createElement('ul');
    skillsList.classList.add('highlighted-skills__list');

    skills.forEach(skill => {
        const highlightedSkill = document.createElement('li');
        highlightedSkill.classList.add('highlighted-skills');
        highlightedSkill.textContent = skill;

        skillsList.appendChild(highlightedSkill);
    })
    return skillsList;
}

function createProjectModal(project){
    const modal = document.createElement('div');
    modal.id = project.id;
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');

    const btnClose = document.createElement('button');
    btnClose.classList.add('close');
    btnClose.dataset.modal = project.id;
    btnClose.textContent = 'X';

    btnClose.addEventListener('click', (event) => {
        event.preventDefault();
        closeModal(project.id);
    })

    const title = document.createElement('h1');
    title.classList.add('project-title', 'modal__titles');
    title.textContent = project.title;

    const overviewDiv = document.createElement('div');
    overviewDiv.classList.add('modal__header-content');

    const overviewTitle = document.createElement('p');
    overviewTitle.classList.add('project-details__desc--italic');
    overviewTitle.textContent = 'Overview:';

    const overviewContent = document.createElement('p');
    overviewContent.classList.add('project-details__desc');
    overviewContent.classList.add('project-details__desc--modal-padding');
    overviewContent.textContent = project.overview;

    overviewDiv.append(overviewTitle, overviewContent);


    const roleDiv = document.createElement('div');
    roleDiv.classList.add('modal__header-content');

    const roleTitle = document.createElement('p');
    roleTitle.classList.add('project-details__desc--italic');
    roleTitle.textContent = 'Role:';

    const roleContent = document.createElement('p');
    roleContent.classList.add('project-details__desc', 'project-details__desc--modal-padding');
    roleContent.textContent = 'Cybersecurity Analyst';

    roleDiv.append(roleTitle, roleContent);


    modalContent.append(btnClose, title, overviewDiv, roleDiv);

    modal.appendChild(modalContent);

    return modal;


    // const scenarioTitle = document.createElement('h2');
    // scenarioTitle.classList.add('modal__section-titles');
    // scenarioTitle.textContent = project.sections[0].heading;

    // const contentArray = toArray(project.sections[0].content);

    // contentArray.forEach(text => {
    //     const scenarioContent = document.createElement('p');
    //     scenarioContent.classList.add('project-details__desc', 'project-details--newline');
    //     scenarioContent.textContent = text;
    //     modalContent.appendChild(scenarioContent);
    // })



    // let sections = renderSectionData(project.sections);
    // modal.append(modalContent, sections);
}

function renderProjectCards(projects){
    const portfolioContainer = document.querySelector('.section-cards__container--portfolio');

    projects.forEach(project => {
        // project.sections.forEach(section => {
        //     renderSectionData(section, portfolioContainer);
        // })
        portfolioContainer.append(createProjectCard(project), createProjectModal(project));
    })

    return portfolioContainer;
}

/* TO-DO: 
Display Sections from JSON data on project modals
*/ 

// WIP - starting here
function renderSectionData(section, container){
    if(section.type === 'text'){
        const sectionTitle = document.createElement('h2');
        sectionTitle.classList.add('modal__section-titles');
        sectionTitle.textContent = section.heading;
        
        console.log(sectionTitle);
    
    
        const sectionContent = document.createElement('p');
        sectionContent.classList.add('project-details__desc', 'project-details__desc--modal-padding');
        sectionContent.textContent = section.content;
    
        console.log(sectionContent);

        container.append(sectionTitle, sectionContent);
    } else if(section.type === 'subsections'){
        const sectionTitle = document.createElement('h2');
        sectionTitle.classList.add('modal__section-titles');
        sectionTitle.textContent = section.heading;
        
        console.log(sectionTitle);


        const subsectionContainer = document.createElement('div');
        subsectionContainer.classList.add('project-details__desc');


        section.items.forEach(item => {
            const sectionSubtitle = document.createElement('h3');
            sectionSubtitle.classList.add('modal__section-subtitles');
            sectionSubtitle.textContent = item.subheading;
            
            console.log(sectionTitle);
        
        
            const sectionContent = document.createElement('p');
            sectionContent.classList.add('project-details__desc');
            sectionContent.textContent = item.content;
        
            console.log(sectionContent);

            subsectionContainer.append(sectionSubtitle, sectionContent);

            container.appendChild(subsectionContainer);
        })
    }
    


    // portfolioContainer.append(sectionTitle, sectionContent);
    


    // cybersecurityProjects.forEach(project => {
    //     project.sections.forEach(section => {
    //         if(section.type === 'text'){
    //             // console.log('TEXT:', section);

    //             const sectionTitle = document.createElement('h2');
    //             sectionTitle.classList.add('modal__section-titles');
    //             sectionTitle.textContent = section.heading;
                
    //             // console.log(sectionTitle);


    //             const sectionContent = document.createElement('p');
    //             sectionContent.classList.add('project-details__desc', 'project-details__desc--modal-padding');
    //             sectionContent.textContent = section.content;


    //             portfolioContainer.append(sectionTitle, sectionContent);
                
    //         } else{
    //             console.log('PROJECT:', section);
    //         }
        // })
    // })
    

    // toArray(section.content).forEach(text => {
    //     const sectionContent = document.createElement('p');
    //     sectionContent.classList.add('project-details__desc', 'project-details--newline');
    //     sectionContent.textContent = text;

    //     portfolioContainer.appendChild(sectionContent);
    // })


    // if(section.items){
    //     if(section.items.ordered === false){
    //         const unorderedList = document.createElement('ul');
    //         unorderedList.classList.add('project-details__desc');
    //         const listItems = document.createElement('li');
    //         listItems.classList.add('modal__list-items', 'modal__list-items--strong');
    //         listItems.textContent = items.subheading;
    //     }
    // }
}

console.log(cybersecurityProjects);


        




// Cybersecurity Projects - Modal Functionality
function openModal(id){
    const modal = document.getElementById(id);
    if(!modal) return;
    modal.classList.add('visible');

    // hide <body> scroll functionality
    document.body.classList.add('overflow-hidden');
}

function closeModal(id){
    const modal = document.getElementById(id);
    if(!modal) return;
    modal.classList.remove('visible');

    // make <body> scroll functionality visible
    document.body.classList.remove('overflow-hidden');
}


// Helper: Convert JSON data strings to array
function toArray(data){
    if(Array.isArray(data)){
        return data;
    } 
    
    if(typeof data === 'string'){
        return [data];
    }

    return [];
}



// // document.querySelectorAll("[data-modal]").forEach(btnViewDetails => {
// //     btnViewDetails.addEventListener('click', (event) => {
// //         event.preventDefault();
// //         const modalId = btnViewDetails.dataset.modal; //HTML5: Gets data-modal value
// //         openModal(modalId);

// //         // hide <body> scroll functionality
// //         document.body.classList.add('overflow-hidden');
// //     })    
// // });

// // document.querySelectorAll(".close[data-modal]").forEach(btnClose => {
// //     btnClose.addEventListener('click', (event) => {
// //         event.preventDefault();
// //         const modalId = btnClose.dataset.modal; //HTML5: Gets data-modal value
// //         closeModal(modalId);

// //         // make <body> scroll functionality visible
// //         document.body.classList.remove('overflow-hidden');
// //     })
// // })


// // Refactor: btnViewDetails modal functionality
// // function modalFunctionality(openBtn, closeBtn, modalId){
// //     openBtn.addEventListener('click', (event) => {
// //         event.preventDefault();
// //         openModal(modalId);

// //         // hide <body> scroll functionality
// //         document.body.classList.add('overflow-hidden');
// //     });

// //     closeBtn.addEventListener('click', (event) => {
// //         event.preventDefault();
// //         closeModal(modalId);

// //         // make <body> scroll functionality visible
// //         document.body.classList.remove('overflow-hidden');
// //     })
// // }


// // Refactor: Load and Render Cybersecurity Project Details upon button click
// async function loadProjectDetails(){
//     try {
//         const response = await getProjectDetails();
//         cybersecurityProjectDetails = response;
        
//         const projectDetailsWithIds = cybersecurityProjectDetails.map((project, index) =>{
//             return{
//                 id: `CSProject${index + 1}`,
//                 ...project
//             }
//         })
//         // console.log(projectDetailsWithIds);
        
//         renderAllDetails(projectDetailsWithIds);

//         return projectDetailsWithIds;
//     } catch (error) {
//         console.log('Error loading Cybersecurity Project Details:', error)        
//     }
// }

// await loadProjectDetails();
        

// // To-do: Display role": "Cybersecurity Analyst" for ALL PROJECTS (below Overview)




// function renderAllDetails(projectDetails){
//     projectDetails.forEach(detail => {
//         


//         btnClose.addEventListener('click', (event) => {
//             event.preventDefault();
//             closeModal(detail.id);

//             // make <body> scroll functionality visible
//             document.body.classList.remove('overflow-hidden');
//         })


//         



//         console.log(detail);
        

//         contentContainer.appendChild(btnClose);
//         contentContainer.appendChild(title);
//         contentContainer.appendChild(overviewDiv);
//         contentContainer.appendChild(roleDiv);
//         contentContainer.appendChild(scenarioTitle);


//         parentContainer.appendChild(contentContainer);
//         document.body.appendChild(parentContainer);
//     })
// }