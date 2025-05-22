// import { getShows } from "./band-site-api.js";
import BandSiteApi from "./band-site-api.js";


let shows = [];


// Creating instance of BandSiteApi class
const bandSiteApi = new BandSiteApi();


async function loadShows(){
    try {
        // shows = await getShows();
        shows = await bandSiteApi.getShows();
        displayShows(shows);
    } catch (error) {
        console.error('Error loading show dates:', error.response?.status, error.message);
    }
}


async function displayShows(shows){
    const showsContainer = document.querySelector('.shows__container');
    
    
    shows.forEach((show) => {
        const showsSubcontainer = document.createElement('div');
        showsSubcontainer.classList.add('shows__subcontainer');
    
        const dateContainer = document.createElement('div');
        dateContainer.classList.add('shows__subcontainer--column');
    
        const dateHeading = document.createElement('h3');
        dateHeading.innerHTML = 'DATE';
        dateHeading.classList.add('shows-section__headings');
    
        const dateValue = document.createElement('div');
        const timestampToDate = new Date(show.date).toLocaleDateString('en-US', {
            weekday: "short",
            month: "short",
            day: 'numeric',
            year: "numeric"
        })
        dateValue.innerHTML = timestampToDate.toString().replaceAll(',', ' ');
        dateValue.classList.add('shows-section__shows-info');
        dateValue.classList.add('shows-section__shows-info--bold');
    
        dateContainer.appendChild(dateHeading);
        dateContainer.appendChild(dateValue);
    
    
        const venueContainer = document.createElement('div');
        venueContainer.classList.add('shows__subcontainer--column');
    
        const venueHeading = document.createElement('h3');
        venueHeading.innerHTML = 'VENUE';
        venueHeading.classList.add('shows-section__headings');
    
        const venueValue = document.createElement('div');
        venueValue.innerHTML = show.place;
        venueValue.classList.add('shows-section__shows-info');
    
        venueContainer.appendChild(venueHeading);
        venueContainer.appendChild(venueValue);
        
    
        const locationContainer = document.createElement('div');
        locationContainer.classList.add('shows__subcontainer--column');
    
        const locationHeading = document.createElement('h3');
        locationHeading.innerHTML = 'LOCATION';
        locationHeading.classList.add('shows-section__headings');
    
        const locationValue = document.createElement('div');
        locationValue.innerHTML = show.location;
        locationValue.classList.add('shows-section__shows-info');
    
        locationContainer.appendChild(locationHeading);
        locationContainer.appendChild(locationValue);
    
    
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('shows__subcontainer--column');
    
        const button = document.createElement('button');
        button.textContent = 'BUY TICKETS';
        button.classList.add('button');
    
        buttonContainer.appendChild(button);
    
        
        showsSubcontainer.appendChild(dateContainer);
        showsSubcontainer.appendChild(venueContainer);
        showsSubcontainer.appendChild(locationContainer);
        showsSubcontainer.appendChild(buttonContainer);
    
    
        const dividerContainer = document.createElement('div');
        const divider = document.createElement('div');
        divider.classList.add('divider');
    
        dividerContainer.appendChild(divider);
    
        showsContainer.appendChild(showsSubcontainer);
        showsContainer.appendChild(dividerContainer);
    
    
        if(dateValue.innerHTML === shows[0].date && venueValue.innerHTML === shows[0].venue && locationValue.innerHTML === shows[0].location){
            dateValue.classList.add('shows-section__shows-info--first');
            venueValue.classList.add('shows-section__shows-info--first');
            locationValue.classList.add('shows-section__shows-info--first');
            button.classList.add('button--first');
        }  else{
            dateHeading.classList.add('hidden');
            venueHeading.classList.add('hidden');
            locationHeading.classList.add('hidden');
    
            dateValue.classList.add('shows-section__shows-info--center');
            venueValue.classList.add('shows-section__shows-info--center');
            locationValue.classList.add('shows-section__shows-info--center');
            button.classList.add('button--remaining');
        }
    })
}


loadShows();
    

