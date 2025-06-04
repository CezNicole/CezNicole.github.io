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

export function search(){
    const searchInput = document.getElementById('searchInput').value;
    console.log(searchInput);
    
    if(searchInput){
        console.log('Search Input is not empty');
        
        loadData();
        
        destinations.forEach(destination => {
            if(destination.name === searchInput){
                console.log(destinations.filter(destination => destination.name === searchInput));
                // const localTimezone = getLocalTimezone(destination.name);
                // console.log(localTimezone);
            }
        })
    

        if(destinations.includes(searchInput)){
            console.log(destinations.includes(searchInput));
            
            const searchResultsSection = document.createElement('section');
            searchResultsSection.classList.add('search-results');

            const localTimeDivContainer = document.createElement('div');
            localTimeDivContainer.classList.add('search-results__local-time');
            localTimeDivContainer.innerHTML = `Current Local Time ${getLocalTimezone(searchInput)}`;


            searchResultsSection.appendChild(localTimeDivContainer);
        }
    } else{
        searchResultsSection.innerHTML = 'No data found. Please modify your search.'
    }
}

export async function getLocalTimezone(area){
    try {
        const response = await axios.get(`http://worldtimeapi.org/api/timezone/${area}`);
        return response;
    } catch (error) {
        console.error('Error fetching timezone:', error.response?.status, error.message);
    }
}

const btnSearchIcon = document.getElementById('btnMobileSearch');
btnSearchIcon.addEventListener('click', (event) => {
    event.preventDefault();
    search();
})