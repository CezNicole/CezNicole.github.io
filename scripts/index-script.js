import {getProjects, getHighlightedSkills} from "./index-api.js";

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
let skills = [];

async function loadSkills(){
    try {
        skills = await getHighlightedSkills();
        return skills;
    } catch (error) {
        console.log('Error loading Highlighted Skills', error);
    }
}

skills = await loadSkills();

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

    // Display project modal details
    project.sections.forEach(section => {
        renderSectionData(section, modalContent);
    })
    
    modal.appendChild(modalContent);

    return modal;
}

function renderProjectCards(projects){
    const portfolioContainer = document.querySelector('.section-cards__container--portfolio');

    projects.forEach(project => {
        portfolioContainer.append(createProjectCard(project), createProjectModal(project));
    })

    return portfolioContainer;
}

// TO-DO: Refactor to make the code DRY for each section type render
function renderSectionData(section, container){
    if(section.type === 'text'){
        const sectionTitle = document.createElement('h2');
        sectionTitle.classList.add('modal__section-titles');
        sectionTitle.textContent = section.heading;
        
        container.appendChild(sectionTitle);

        toArray(section.content).forEach(text => {
            const sectionContent = document.createElement('p');
            sectionContent.classList.add('project-details__desc', 'project-details--newline', 'project-details__desc--modal-padding');
            sectionContent.textContent = text;

            container.appendChild(sectionContent);
        })
    } else if(section.type === 'subsections'){
        const sectionTitle = document.createElement('h2');
        sectionTitle.classList.add('modal__section-titles');
        sectionTitle.textContent = section.heading;
        
        const subsectionContainer = document.createElement('div');
        subsectionContainer.classList.add('project-details__desc');

        section.items.forEach(item => {
            const sectionSubtitle = document.createElement('h3');
            sectionSubtitle.classList.add('modal__section-subtitles');
            sectionSubtitle.textContent = item.subheading;
            
            subsectionContainer.appendChild(sectionSubtitle);

            toArray(item.content).forEach(text => {
                const sectionContent = document.createElement('p');
                sectionContent.classList.add('project-details__desc', 'project-details--newline', 'project-details__desc--modal-padding');
                sectionContent.textContent = text;

                subsectionContainer.appendChild(sectionContent);
            })
            container.append(sectionTitle, subsectionContainer);
        })
    } else if(section.type === 'list'){
        const sectionTitle = document.createElement('h2');
        sectionTitle.classList.add('modal__section-titles');
        sectionTitle.textContent = section.heading;
        
        if(section.ordered === false){
            const unorderedList = document.createElement('ul');
            unorderedList.classList.add('project-details__desc--modal-padding');

            section.items.forEach(item => {
                if(item.subheading){
                    const sectionSubtitle = document.createElement('li');
                    sectionSubtitle.classList.add('project-details__desc', 'modal__list-items', 'modal__list-items--strong', 'project-details__desc--remove-bottom-margin');
                    sectionSubtitle.textContent = item.subheading;

                    const itemContent = document.createElement('p');
                    itemContent.classList.add('project-details__desc', 'project-details__desc--extra-padding');
                    itemContent.textContent = item.content;

                    unorderedList.append(sectionSubtitle, itemContent);
                }

                toArray(item).forEach(text => {
                    const listItems = document.createElement('li');
                    listItems.classList.add('project-details__desc');
                    listItems.textContent = text;

                    unorderedList.appendChild(listItems);
                })
            })

            container.append(sectionTitle, unorderedList);

        } else if(section.ordered === true){
            const orderedList = document.createElement('ol');
            orderedList.classList.add('project-details__desc--modal-padding');

            section.items.forEach(item => {
                if(item.subheading){
                    const sectionSubtitle = document.createElement('li');
                    sectionSubtitle.classList.add('project-details__desc', 'modal__list-items', 'modal__list-items--strong', 'project-details__desc--remove-bottom-margin');
                    sectionSubtitle.textContent = item.subheading;

                    const itemContent = document.createElement('p');
                    itemContent.classList.add('project-details__desc', 'project-details__desc--extra-padding');
                    itemContent.textContent = item.content;
                    
                    orderedList.append(sectionSubtitle, itemContent);
                }

                toArray(item).forEach(text => {
                    const listItems = document.createElement('li');
                    listItems.classList.add('project-details__desc');
                    listItems.textContent = text;

                    orderedList.appendChild(listItems);
                })
                container.append(sectionTitle, orderedList);
            })
        }

        toArray(section.content).forEach(text => {
            const sectionContent = document.createElement('p');
            sectionContent.classList.add('project-details__desc', 'project-details--newline', 'project-details__desc--modal-padding', 'project-details--top-padding');
            sectionContent.textContent = text;

            container.appendChild(sectionContent);
        })
    } else if(section.type === 'table'){
        const sectionTitle = document.createElement('h2');
        sectionTitle.classList.add('modal__section-titles');
        sectionTitle.textContent = section.heading;
        
        const subsectionContainer = document.createElement('div');
        subsectionContainer.classList.add('project-details__desc');

        // section.items.forEach(item => {
        //     const sectionSubtitle = document.createElement('h3');
        //     sectionSubtitle.classList.add('modal__section-subtitles');
        //     sectionSubtitle.textContent = item.subheading;
            
        //     subsectionContainer.appendChild(sectionSubtitle);

        //     toArray(item.content).forEach(text => {
        //         const sectionContent = document.createElement('p');
        //         sectionContent.classList.add('project-details__desc', 'project-details--newline', 'project-details__desc--modal-padding');
        //         sectionContent.textContent = text;

        //         subsectionContainer.appendChild(sectionContent);
        //     })
        container.append(sectionTitle, subsectionContainer);
    }
}

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

function calculateOverallRiskScore(likelihood, severity){
    return likelihood * severity;
}