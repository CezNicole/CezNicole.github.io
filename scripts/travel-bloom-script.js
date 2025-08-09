import { getJsonData } from "./travel-bloom-api.js";

let destinations = {};


export async function loadData(){
    try {
        const response = await getJsonData();
        destinations = response;
        // console.log('Printing contents of the destinations array:', destinations);
        
        return destinations;
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

const searchInput = document.querySelector('.search-bar__input');

const divParentContainer = document.querySelector('.search-results');

const searchResultsSection = document.createElement('section');

const divLocalTime = document.createElement('div');



let matchFound = false;


// WIP here
export async function search(input){
    /*
    // 1. user enters destination / keyword from input field
    // 2. search function functionality
        // a) when Search button is clicked, the form submits
        // b) when a valid input is entered, JSON data is loaded / accessed
    // 3. when user input matches the keyword on the JSON data (countries, temples, beaches, or actual 'name' value)
    //     a) JSON data is filtered to display only the matched keyword / destination
    //     b) search results are displayed on the DOM via the destination cards
    //     c) dynamic DOM elements are created w/ styling
    4. Timezone API functionality
        a) if a country is searched, display the appropriate current local time from Timezone API
        b) else, only show the aqua div container w/ no text
    
    */
    
   
   
    input = searchInput.value.trim().toLowerCase();
    console.log('Inside the search function, the input value is:', input);

    
    
    

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
    searchResultsSection.innerHTML = '';


    const countriesArr = [];

    destinations.countries.forEach(country => {
        country.cities.forEach(city => {
            countriesArr.push({
                // TO-DO: MODIFY THE OBJECT STRUCTURE TO DISPLAY CITY DETAILS CORRECTLY WHEN THE COUNTRY NAME MATCHES INPUT, SAME WITH CITY NAME
                cityName: city.name,
                cityImage: city.imageUrl,
                cityDesc: city.description,
                countryName: city.name.split(", ")[1]
            })
            // console.log('Country Name:', countriesData.countryName, " and City Name:", countriesData.cityName, 'Image URL:', countriesData.imgUrl, 'Description:', countriesData.desc);
        })
    })

    console.log('Countries Array Data:', countriesArr);



    const templesArr = [];

    destinations.temples.forEach(temple => templesArr.push({
        destination: temple.name.split(", ")[0],
        country: temple.name.split(", ")[1],
        image: temple.imageUrl,
        desc: temple.description
    }))

    console.log('Temples Array Data:', templesArr);

    

    const beachesArr = [];

    destinations.beaches.forEach(beach => beachesArr.push({
        destination: beach.name.split(", ")[0],
        country: beach.name.split(", ")[1],
        image: beach.imageUrl,
        desc: beach.description
    }))

    console.log('Beaches Array Data:', beachesArr);



    // Finding country / city matches
    let countryMatches = countriesArr.filter(country => country.countryName.toLowerCase().includes(input) || country.cityName.toLowerCase().includes(input));
    console.log('Country Matches:', countryMatches);

    // Finding temple matches
    let templeMatches = templesArr.filter(temple => temple.destination.toLowerCase().includes(input) || temple.country.toLowerCase().includes(input));
    console.log('Temple Matches:', templeMatches);

    // Finding beach matches
    let beachMatches = beachesArr.filter(beach => beach.destination.toLowerCase().includes(input) || beach.country.toLowerCase().includes(input));
    console.log('Beach Matches:', beachMatches);
    
    


    if(input.includes('country') || input.includes('countries')){
        destinations.countries.forEach(country => country.cities.forEach(city => {
            const divSearchResultsCards = document.createElement('div');
            divSearchResultsCards.classList.add('search-results__cards');

            
            const imgCard = document.createElement('img');
            imgCard.src = city.imageUrl;
            imgCard.alt = city.name;
            // imgCard.src = country.cityImage;
            // imgCard.alt = country.cityName;
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
        
            divParentContainer.appendChild(searchResultsSection);


            divParentContainer.classList.remove('invalid-search');

            
            // console.log(country);
            console.log(country);
        }))
    } else if(input.includes('temple') || input.includes('temples')){
        destinations.temples.forEach(temple => {
            const divSearchResultsCards = document.createElement('div');
            divSearchResultsCards.classList.add('search-results__cards');

            
            const imgCard = document.createElement('img');
            imgCard.src = temple.imageUrl;
            imgCard.alt = temple.name;
            imgCard.classList.add('search-results__card-images');
    
    
            const divCardDetails = document.createElement('div');
            divCardDetails.classList.add('search-results__card-details');
    
            const destinationName = document.createElement('h3');
            destinationName.classList.add('search-results__destination');
            destinationName.innerHTML = temple.name;
    
            const destinationDescription = document.createElement('p');
            destinationDescription.classList.add('search-results__description');
            destinationDescription.textContent = temple.description;
    
            const btnVisit = document.createElement('button');
            btnVisit.classList.add('buttons', 'buttons__visit');
            btnVisit.innerHTML = 'Visit';
    
    
            divCardDetails.appendChild(destinationName);
            divCardDetails.appendChild(destinationDescription);
            divCardDetails.appendChild(btnVisit);
    
    
            divSearchResultsCards.appendChild(imgCard);
            divSearchResultsCards.appendChild(divCardDetails);
    
            
            searchResultsSection.appendChild(divSearchResultsCards);
        
            divParentContainer.appendChild(searchResultsSection);


            divParentContainer.classList.remove('invalid-search');


            console.log(temple);
        })
    } else if(input.includes('beach') || input.includes('beaches')){
        destinations.beaches.forEach(beach => {
            const divSearchResultsCards = document.createElement('div');
            divSearchResultsCards.classList.add('search-results__cards');

            
            const imgCard = document.createElement('img');
            imgCard.src = beach.imageUrl;
            imgCard.alt = beach.name;
            imgCard.classList.add('search-results__card-images');
    
    
            const divCardDetails = document.createElement('div');
            divCardDetails.classList.add('search-results__card-details');
    
            const destinationName = document.createElement('h3');
            destinationName.classList.add('search-results__destination');
            destinationName.innerHTML = beach.name;
    
            const destinationDescription = document.createElement('p');
            destinationDescription.classList.add('search-results__description');
            destinationDescription.textContent = beach.description;
    
            const btnVisit = document.createElement('button');
            btnVisit.classList.add('buttons', 'buttons__visit');
            btnVisit.innerHTML = 'Visit';
    
    
            divCardDetails.appendChild(destinationName);
            divCardDetails.appendChild(destinationDescription);
            divCardDetails.appendChild(btnVisit);
    
    
            divSearchResultsCards.appendChild(imgCard);
            divSearchResultsCards.appendChild(divCardDetails);
    
            
            searchResultsSection.appendChild(divSearchResultsCards);
        
            divParentContainer.appendChild(searchResultsSection);


            divParentContainer.classList.remove('invalid-search');



            console.log(beach);
        })
    } else{
        divParentContainer.innerHTML = 'Data not found. Please modify your search (e.g. countries, temples, or beaches).';
        divParentContainer.classList.add('invalid-search');

        console.log('Data not found. Please modify your search (e.g. countries, temples, or beaches).');
    }
    
    
    if(countryMatches.length > 0){
        /*
        TO-DOS: 
        // 1. display cards for data matches (countries)
        2. display cards for all matching data -- countries, temples, beaches
        */
        countryMatches.forEach(dataMatch => {
            matchFound = true;

            const divSearchResultsCards = document.createElement('div');
            divSearchResultsCards.classList.add('search-results__cards');

            
            const imgCard = document.createElement('img');
            imgCard.src = dataMatch.cityImage;
            imgCard.alt = dataMatch.cityName;
            imgCard.classList.add('search-results__card-images');
    
    
            const divCardDetails = document.createElement('div');
            divCardDetails.classList.add('search-results__card-details');
    
            const destinationName = document.createElement('h3');
            destinationName.classList.add('search-results__destination');
            destinationName.innerHTML = dataMatch.cityName;
    
            const destinationDescription = document.createElement('p');
            destinationDescription.classList.add('search-results__description');
            destinationDescription.textContent = dataMatch.cityDesc;
    
            const btnVisit = document.createElement('button');
            btnVisit.classList.add('buttons', 'buttons__visit');
            btnVisit.innerHTML = 'Visit';
    
    
            divCardDetails.appendChild(destinationName);
            divCardDetails.appendChild(destinationDescription);
            divCardDetails.appendChild(btnVisit);
    
    
            divSearchResultsCards.appendChild(imgCard);
            divSearchResultsCards.appendChild(divCardDetails);
    
            
            searchResultsSection.appendChild(divSearchResultsCards);
        
            divParentContainer.appendChild(searchResultsSection);


            divParentContainer.classList.remove('invalid-search');


            console.log('Country Matches:', dataMatch);
            
        })
        // console.log(`It's a match! ${countriesData.countryName} ${countriesData.cityName}`);
    } 


    // DONE: TO-DO: Add another 'elseif' stmt to display cards for templeMatches and beachMatches
    if(templeMatches.length > 0){
        templeMatches.forEach(dataMatch => {
            matchFound = true;

            const divSearchResultsCards = document.createElement('div');
            divSearchResultsCards.classList.add('search-results__cards');

            
            const imgCard = document.createElement('img');
            imgCard.src = dataMatch.image;
            imgCard.alt = `${dataMatch.destination}, ${dataMatch.country}`;
            imgCard.classList.add('search-results__card-images');
    
    
            const divCardDetails = document.createElement('div');
            divCardDetails.classList.add('search-results__card-details');
    
            const destinationName = document.createElement('h3');
            destinationName.classList.add('search-results__destination');
            destinationName.innerHTML = `${dataMatch.destination}, ${dataMatch.country}`;
    
            const destinationDescription = document.createElement('p');
            destinationDescription.classList.add('search-results__description');
            destinationDescription.textContent = dataMatch.desc;
    
            const btnVisit = document.createElement('button');
            btnVisit.classList.add('buttons', 'buttons__visit');
            btnVisit.innerHTML = 'Visit';
    
    
            divCardDetails.appendChild(destinationName);
            divCardDetails.appendChild(destinationDescription);
            divCardDetails.appendChild(btnVisit);
    
    
            divSearchResultsCards.appendChild(imgCard);
            divSearchResultsCards.appendChild(divCardDetails);
    
            
            searchResultsSection.appendChild(divSearchResultsCards);
        
            divParentContainer.appendChild(searchResultsSection);


            divParentContainer.classList.remove('invalid-search');


            console.log('Temple Matches:', dataMatch);
        })
    } 


    // RESOLVED: BUG: searching for 'brazil' only shows the countries data, not the 'Copacabana Beach, Brazil' from the beaches object 
    if(beachMatches.length > 0){
        beachMatches.forEach(dataMatch => {
            matchFound = true;

            const divSearchResultsCards = document.createElement('div');
            divSearchResultsCards.classList.add('search-results__cards');

            
            const imgCard = document.createElement('img');
            imgCard.src = dataMatch.image;
            imgCard.alt = `${dataMatch.destination}, ${dataMatch.country}`;
            imgCard.classList.add('search-results__card-images');
    
    
            const divCardDetails = document.createElement('div');
            divCardDetails.classList.add('search-results__card-details');
    
            const destinationName = document.createElement('h3');
            destinationName.classList.add('search-results__destination');
            destinationName.innerHTML = `${dataMatch.destination}, ${dataMatch.country}`;
    
            const destinationDescription = document.createElement('p');
            destinationDescription.classList.add('search-results__description');
            destinationDescription.textContent = dataMatch.desc;
    
            const btnVisit = document.createElement('button');
            btnVisit.classList.add('buttons', 'buttons__visit');
            btnVisit.innerHTML = 'Visit';
    
    
            divCardDetails.appendChild(destinationName);
            divCardDetails.appendChild(destinationDescription);
            divCardDetails.appendChild(btnVisit);
    
    
            divSearchResultsCards.appendChild(imgCard);
            divSearchResultsCards.appendChild(divCardDetails);
    
            
            searchResultsSection.appendChild(divSearchResultsCards);
        
            divParentContainer.appendChild(searchResultsSection);


            divParentContainer.classList.remove('invalid-search');


            console.log('Beach Matches:', dataMatch);
        })
    } 

    // if(!input || !matchFound){
    //     divParentContainer.innerHTML = 'Data not found. Please modify your search (e.g. countries, temples, or beaches).';
    //     divParentContainer.classList.add('invalid-search');

    //     console.log('Data not found. Please modify your search (e.g. countries, temples, or beaches).');
    // } else{
    //     /* 
    //     TO-DOS:
    //     1. Refactor code to only display card details in the DOM when the data matches
    //     2. Fix bug: on page load, the error message doesn't get displayed when clicking on Search button w/o any search input
    //     3. Fix bug: when entering a space as an input, the error message doesn't get displayed in the DOM + the input field doesn't turn red
    //     4. Fix bug: when 2 spaces are entered as input, all data gets displayed
    //     */
    // }
    


    /*
    TO-DO'S:
    ---------
    COUNTRIES
    -check if search input includes country name (e.g. Australia / Japan / Brazil)
    -if yes, display all cities
    -if no, return error message

    CITIES (similar w/ TEMPLES, BEACHES)
    -check if search input includes cities name (e.g. Sydney / Tokyo / Rio de Janeiro)
    -if yes, display the matched data
    -if no, return error message

    Bonus: handle a keyword from the description


    Create styling for tablet, desktop
    Make the code DRY (css, script files)
    
    */



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