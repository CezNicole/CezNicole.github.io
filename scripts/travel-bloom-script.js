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
    const searchInput = document.getElementById('searchInput');
    if(searchInput){
        if(destinations.includes(searchInput)){
            
        }
    }
}

const btnSearchIcon = document.getElementById('btnMobileSearch');
btnSearchIcon.addEventListener('click', (event) => {
    event.preventDefault();

    
})