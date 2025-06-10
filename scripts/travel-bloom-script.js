import { getJsonData } from "./travel-bloom-api.js";

let destinations = {};

export async function loadData(){
    try {
        const response = await getJsonData();
        destinations = response;
        console.log('Printing all destinations:', destinations);
        
        return destinations;
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

const searchInput = document.querySelector('.search-bar__input');

const divParentContainer = document.querySelector('.search-results');

const searchResultsSection = document.createElement('section');

const divLocalTime = document.createElement('div');


// WIP here
export async function search(input){
    /*
    // 1. user enters destination / keyword from input field
    // 2. search function functionality
        // a) when Search button is clicked, the form submits
    3. when user input matches the keyword on the JSON data, search results w/ the destination cards are displayed on the DOM
        a) JSON data is filtered to display only the matched keyword / destination
        b) dynamic DOM elements are created w/ styling
    4. Timezone API functionality
        a) if a country is searched, display the appropriate current local time from Timezone API
        b) else, only show the aqua div container w/ no text
    
    */
   
   
   
    input = searchInput.value.trim().toLowerCase();
    console.log(input);
    

    // Form Validation
    if(input){
        searchInput.classList.remove('error');
        destinations = await loadData();

        divParentContainer.innerHTML = '';

        divLocalTime.classList.add('search-results__local-time');
        // divLocalTime.textContent = location.name;

        divParentContainer.appendChild(divLocalTime);
    } else{
        searchInput.classList.add('error');
        console.log('Please enter a valid destination / keyword.');
    }

    searchInput.addEventListener('input', () => {
        if(input){
            searchInput.classList.remove('error');
        }
    })

    searchInput.addEventListener('focus', () => {
        searchInput.classList.add('focus');
        searchInput.classList.remove('error');
    })




    // Search Filter
    divParentContainer.innerHTML = '';
    
    for(const [key, locations] of Object.entries(destinations)){

        locations.forEach(location => {
            const divSearchResultsCards = document.createElement('div');
            divSearchResultsCards.classList.add('search-results__cards');


            const imgCard = document.createElement('img');
            imgCard.src = location.imageUrl;
            imgCard.alt = location.name;
            imgCard.classList.add('search-results__card-images');
    
    
            const divCardDetails = document.createElement('div');
            divCardDetails.classList.add('search-results__card-details');
    
            const destinationName = document.createElement('h3');
            destinationName.classList.add('search-results__destination');
            destinationName.innerHTML = location.name;
    
            const destinationDescription = document.createElement('p');
            destinationDescription.classList.add('search-results__description');
            destinationDescription.textContent = location.description;
    
            const btnVisit = document.createElement('button');
            btnVisit.classList.add('buttons', 'buttons__visit');
            btnVisit.innerHTML = 'Visit';
    
    
            divCardDetails.appendChild(destinationName);
            divCardDetails.appendChild(destinationDescription);
            divCardDetails.appendChild(btnVisit);
    
    
            divSearchResultsCards.appendChild(imgCard);
            divSearchResultsCards.appendChild(divCardDetails);
    
            
            searchResultsSection.appendChild(divSearchResultsCards);
            


            if(key === 'countries'){
                location.cities.forEach(city => {
                    const imgCard = document.createElement('img');
                    imgCard.src = city.imageUrl;
                    imgCard.alt = city.name;
                    imgCard.classList.add('search-results__card-images');
            
            
                    const divCardDetails = document.createElement('div');
                    divCardDetails.classList.add('search-results__card-details');
            
                    const destinationName = document.createElement('h3');
                    destinationName.classList.add('search-results__destination');
                    destinationName.innerHTML = city.name;
            
                    const destinationDescription = document.createElement('p');
                    destinationDescription.classList.add('search-results__description');
                    destinationDescription.textContent = city.description;
            
                    const btnVisit = document.createElement('button');
                    btnVisit.classList.add('buttons', 'buttons__visit');
                    btnVisit.innerHTML = 'Visit';
            
            
                    divCardDetails.appendChild(destinationName);
                    divCardDetails.appendChild(destinationDescription);
                    divCardDetails.appendChild(btnVisit);
            
            
                    divSearchResultsCards.appendChild(imgCard);
                    divSearchResultsCards.appendChild(divCardDetails);
            
                    
                    searchResultsSection.appendChild(divSearchResultsCards);
                })
            }
        });
    }

    divParentContainer.appendChild(searchResultsSection);
}

// export async function getLocalTimezone(area){
//     try {
//         const response = await axios.get(`http://worldtimeapi.org/api/timezone/${area}`);
//         return response;
//     } catch (error) {
//         console.error('Error fetching timezone:', error.response?.status, error.message);
//     }
// }

export function clear(){
    searchInput.value = '';
    divParentContainer.innerHTML = '';
}

const btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', (event) => {
    event.preventDefault();
    search();
})

const btnClear = document.getElementById('btnClear');
btnClear.addEventListener('click', (event) => {
    event.preventDefault();
    clear();
})