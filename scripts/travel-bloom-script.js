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

const divContainer = document.querySelector('.search-results');

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

        divContainer.innerHTML = '';

        divLocalTime.classList.add('search-results__local-time');
        // divLocalTime.textContent = location.name;

        divContainer.appendChild(divLocalTime);
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
    // For Testing
    console.log('Displaying search results:', input);
    
    // divContainer.innerHTML = '';

    // const divLocalTime = document.createElement('div');
    // divLocalTime.classList.add('search-results__local-time');
    // // divLocalTime.textContent = location.name;

    // divContainer.appendChild(divLocalTime);

    
    for (let key in destinations) {
        const locations = destinations[key];

        locations.forEach(location => {
            if(input.includes('countries')){
                if(input.includes(key)){
                    location.cities.forEach(city => {
                        const divSearchResultsCards = document.createElement('div');
                        divSearchResultsCards.classList.add('search-results__cards');
    
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

                    divContainer.appendChild(searchResultsSection);
                } 
            } else{
                console.log('Modify your input');
            }
            // else if(key === 'temples'){
            //     console.log('Temples:', location.name);
            // } else {
            //     console.log('Beaches:', location.name);
            // }
        });
    }

    

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
    divContainer.innerHTML = '';
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