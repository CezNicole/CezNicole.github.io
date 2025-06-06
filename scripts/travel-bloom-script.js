import { getJsonData } from "./travel-bloom-api.js";

let destinations = [];

export async function loadData(){
    try {
        const response = await getJsonData();
        destinations.push(response);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// WIP here
const searchInput = document.querySelector('.search-bar__input');

export function search(){
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

    if(searchInputText){
        searchInput.classList.remove('error');
        loadData();
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
        searchInput.classList.add('search-bar__input');
        searchInput.classList.remove('error');
    })



    // nameInput.addEventListener('input', () => {
    //     if(nameInput.value.trim()){
    //         nameInput.classList.remove('error');
    //     }
    // })
    
    // commentInput.addEventListener('input', () => {
    //     if(commentInput.value.trim()){
    //         commentInput.classList.remove('error');
    //     }
    // })
    

    
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