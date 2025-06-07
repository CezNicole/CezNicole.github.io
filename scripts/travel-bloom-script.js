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

export async function search(){
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

    const searchInputText = searchInput.value.trim();
    console.log(searchInputText);


    // Form Validation
    if(searchInputText){
        searchInput.classList.remove('error');
        destinations = await loadData();
    } else{
        searchInput.classList.add('error');
        console.log('Please enter a valid destination / keyword.');
    }

    searchInput.addEventListener('input', () => {
        if(searchInputText){
            searchInput.classList.remove('error');
        }
    })

    searchInput.addEventListener('focus', () => {
        searchInput.classList.add('focus');
        searchInput.classList.remove('error');
    })


    // Search Filter
    // For Testing
    console.log('Displaying search results:');
    for (let key in destinations) {
        const locations = destinations[key];

        locations.forEach(location => {
            if(key === 'countries'){
                console.log('Country:', location.name);
                
                location.cities.forEach(city => {
                    console.log('Cities:', city.name);
                })
            } else if(key === 'temples'){
                console.log('Temples:', location.name);
            } else {
                console.log('Beaches:', location.name);
            }
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