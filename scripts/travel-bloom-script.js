import { getJsonData } from "./travel-bloom-api.js";

let destinations = [];

export async function loadData(){
    try {
        const response = await getJsonData();
        destinations.push(...response);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// WIP here
const searchInput = document.getElementById('searchInput');

export function search(){
    /*
    1. user enters destination / keyword from input field
    2. search function functionality
        a) on mobile: when magnifying icon is clicked, the form submits
        b) on tablet/desktop: when Search button is clicked, the form submits
    3. when user input matches the keyword on the JSON data, search results w/ the destination cards are displayed on the DOM
        a) JSON data is filtered to display only the matched keyword / destination
        b) dynamic DOM elements are created w/ styling
    4. Timezone API functionality
        a) if a country is searched, display the appropriate current local time from Timezone API
        b) else, only show the aqua div container w/ no text

    */

    const searchText = searchInput.value.trim();
    console.log(searchText);

    if(!searchText){
        searchInput.classList.add('error');
        console.log('Please enter a valid destination / keyword.');
    } else{
        loadData();
    }
    
    // const form = document.querySelector('.search-bar');
    // form.addEventListener('submit', (event) => {
    //     event.preventDefault();

        
    // })




}

// export async function getLocalTimezone(area){
//     try {
//         const response = await axios.get(`http://worldtimeapi.org/api/timezone/${area}`);
//         return response;
//     } catch (error) {
//         console.error('Error fetching timezone:', error.response?.status, error.message);
//     }
// }

const btnSearchIcon = document.getElementById('btnMobileSearch');
btnSearchIcon.addEventListener('click', (event) => {
    event.preventDefault();
    search();
})