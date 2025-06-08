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

// WIP here
const searchInput = document.querySelector('.search-bar__input');

const mainSection = document.querySelector('.main__main-section');

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
   
   
   
//    const searchInputText = searchInput.value.trim();
//    console.log(searchInputText);

    input = searchInput.value.trim().toLowerCase();
    console.log(input);
    

    // Form Validation
    if(input){
        searchInput.classList.remove('error');
        destinations = await loadData();
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
    
    for (let key in destinations) {
        const locations = destinations[key];
        
        // const divLocalTime = document.createElement('div');
        // divLocalTime.classList.add('search-results__local-time');
        // divLocalTime.textContent = location.name;

        locations.forEach(location => {
            
            if(input.includes('countries')){
                if(input.includes(key)){
                    // console.log('Key:', key);
                    const searchResultsSection = document.createElement('section');
                    
                    // const divLocalTime = document.createElement('div');
                    // divLocalTime.classList.add('search-results__local-time');
                    // divLocalTime.textContent = location.name;

                    const divSearchResultsCards = document.createElement('div');
                    divSearchResultsCards.classList.add('search-results__cards');

                    const imgCard = document.createElement('img');

                    const divCardDetails = document.createElement('div');
                        divCardDetails.classList.add('search-results__card-details');

                    location.cities.forEach(city => {
                        // console.log('Cities:', city.name);
                        imgCard.src = city.imageUrl;
                        imgCard.alt = city.name;
                        imgCard.classList.add('search-results__card-images');

                        

                        const destinationName = document.createElement('h3');
                        destinationName.classList.add('search-results__destination');
                        destinationName.innerHTML = city.name;

                        const destinationDescription = document.createElement('p');
                        destinationDescription.classList.add('search-results__description');
                        destinationDescription.textContent = city.description;

                        const btnVisit = document.createElement('button');
                        btnVisit.classList.add('buttons');
                        btnVisit.classList.add('buttons__visit');
                        btnVisit.innerHTML = 'Visit';

                        divCardDetails.appendChild(destinationName);
                        divCardDetails.appendChild(destinationDescription);
                        divCardDetails.appendChild(btnVisit);
                    })
                    const divLocalTime = document.createElement('div');
                    divLocalTime.classList.add('search-results__local-time');
                    divLocalTime.textContent = location.name;

                    
                    divSearchResultsCards.appendChild(imgCard);
                    divSearchResultsCards.appendChild(divCardDetails);



                    searchResultsSection.appendChild(divLocalTime);
                    searchResultsSection.appendChild(divSearchResultsCards);


                    // mainSection.appendChild(divLocalTime);
                    mainSection.appendChild(searchResultsSection);

                    // console.log('Country:', location.name);
                    
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