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


    const countriesData = [];

    destinations.countries.forEach(country => {
        country.cities.forEach(city => {
            countriesData.push({
                // TO-DO: MODIFY THE OBJECT STRUCTURE TO DISPLAY CITY DETAILS CORRECTLY WHEN THE COUNTRY NAME MATCHES INPUT, SAME WITH CITY NAME
                cityName: city.name,
                cityImage: city.imageUrl,
                cityDesc: city.description,
                countryName: city.name.split(", ")[1]
            })
            // console.log('Country Name:', countriesData.countryName, " and City Name:", countriesData.cityName, 'Image URL:', countriesData.imgUrl, 'Description:', countriesData.desc);
        })
    })

    console.log('Countries Data:', countriesData);


    // Finding country / city matches
    let countryMatches = countriesData.filter(country => country.countryName.toLowerCase().includes(input) || country.cityName.toLowerCase().includes(input));
    console.log('Country Matches:', countryMatches);

    // Finding temple matches
    let templeMatches = destinations.temples.filter(temple => temple.name.toLowerCase().includes(input));
    console.log('Temple Matches:', templeMatches);

    // Finding beach matches
    let beachMatches = destinations.beaches.filter(beach => beach.name.toLowerCase().includes(input));
    console.log('Beach Matches:', beachMatches);
    
    


    if(input.includes('countries')){
        destinations.countries.forEach(country => country.cities.forEach(city => {
        // countriesData.forEach(country => {
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
    } else if(input.includes('temples')){
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
    } else if(input.includes('beaches')){
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
    } else if(countryMatches.length > 0){
        /*
        TO-DOS: 
        // 1. display cards for data matches (countries)
        2. display cards for all matching data -- countries, temples, beaches
        */
        countryMatches.forEach(dataMatch => {
            const divSearchResultsCards = document.createElement('div');
            divSearchResultsCards.classList.add('search-results__cards');

            
            const imgCard = document.createElement('img');
            imgCard.src = dataMatch.cityImage;
            imgCard.alt = dataMatch.cityName;
            // imgCard.src = country.cityImage;
            // imgCard.alt = country.cityName;
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


            console.log(dataMatch);
            
        })
        // console.log(`It's a match! ${countriesData.countryName} ${countriesData.cityName}`);
        
    }
    // TO-DO: Add another 'elseif' stmt to display cards for templeMatches and beachMatches
    // else if()
    else{
        divParentContainer.innerHTML = 'Data not found. Please modify your search (e.g. countries, temples, or beaches).';
        divParentContainer.classList.add('invalid-search');

        console.log('Data not found. Please modify your search (e.g. countries, temples, or beaches).');
    }


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


    // if(input){
    //     // destinations = await loadData();

    //     const countriesData = [];

    //     destinations.countries.forEach(country => {
    //         country.cities.forEach(city => {
    //             countriesData.push({
    //                 // TO-DO: MODIFY THE OBJECT STRUCTURE TO DISPLAY CITY DETAILS CORRECTLY WHEN THE COUNTRY NAME MATCHES INPUT, SAME WITH CITY NAME
    //                 cityName: city.name,
    //                 cityImage: city.imageUrl,
    //                 cityDesc: city.description,
    //                 countryName: city.name.split(", ")[1]
    //             })
    //             // console.log('Country Name:', countriesData.countryName, " and City Name:", countriesData.cityName, 'Image URL:', countriesData.imgUrl, 'Description:', countriesData.desc);
    //         })
    //     })

    //     console.log('Countries Data:', countriesData);


    //     // let countryNames = [];

    //     // for (const country of countriesData) {
    //     //     // console.log(country.cityName);
    //     //     let countryName = country.cityName.split(", ");
    //     //     if(countryName.length === 2){
    //     //         console.log(countryName[1]);
                
    //     //         // if(!countryNames.includes(countryName[1])){
    //     //         //     countryNames.push(countryName[1]);
    //     //         // }
    //     //         if(input.includes(countryName[1].toLowerCase())){
    //     //             console.log(`It's a match! Input ${input} =  Value ${countryName[1]}`);



    //     //             // const divSearchResultsCards = document.createElement('div');
    //     //             // divSearchResultsCards.classList.add('search-results__cards');

                    
    //     //             // const imgCard = document.createElement('img');
    //     //             // imgCard.src = country.cityImage;
    //     //             // imgCard.alt = countryName[1];
    //     //             // imgCard.classList.add('search-results__card-images');
            
            
    //     //             // const divCardDetails = document.createElement('div');
    //     //             // divCardDetails.classList.add('search-results__card-details');
            
    //     //             // const destinationName = document.createElement('h3');
    //     //             // destinationName.classList.add('search-results__destination');
    //     //             // destinationName.innerHTML = country.cityName;
            
    //     //             // const destinationDescription = document.createElement('p');
    //     //             // destinationDescription.classList.add('search-results__description');
    //     //             // destinationDescription.textContent = country.cityDesc;
            
    //     //             // const btnVisit = document.createElement('button');
    //     //             // btnVisit.classList.add('buttons', 'buttons__visit');
    //     //             // btnVisit.innerHTML = 'Visit';
            
            
    //     //             // divCardDetails.appendChild(destinationName);
    //     //             // divCardDetails.appendChild(destinationDescription);
    //     //             // divCardDetails.appendChild(btnVisit);
            
            
    //     //             // divSearchResultsCards.appendChild(imgCard);
    //     //             // divSearchResultsCards.appendChild(divCardDetails);
            
                    
    //     //             // searchResultsSection.appendChild(divSearchResultsCards);
                
    //     //             // divParentContainer.appendChild(searchResultsSection);
    //     //         } else{
    //     //             // divParentContainer.innerHTML = 'Data not found. Please modify your search (e.g. countries, temples, or beaches).';
    //     //             // divParentContainer.classList.add('invalid-search');




    //     //             console.log('Data not found. Please modify your search (e.g. countries, temples, or beaches).');
    //     //         }
    //     //     }
    //     // }

        
        
    //     // for(const data of countriesData){
    //     //     if(input.includes(country.toLowerCase())){
    //     //         console.log(`It's a match! Input ${input} =  Value ${country}`);


    //     //         const divSearchResultsCards = document.createElement('div');
    //     //         divSearchResultsCards.classList.add('search-results__cards');

                
    //     //         const imgCard = document.createElement('img');
    //     //         imgCard.src = data.cityImage;
    //     //         imgCard.alt = data.country;
    //     //         imgCard.classList.add('search-results__card-images');
        
        
    //     //         const divCardDetails = document.createElement('div');
    //     //         divCardDetails.classList.add('search-results__card-details');
        
    //     //         const destinationName = document.createElement('h3');
    //     //         destinationName.classList.add('search-results__destination');
    //     //         destinationName.innerHTML = data.country;
        
    //     //         const destinationDescription = document.createElement('p');
    //     //         destinationDescription.classList.add('search-results__description');
    //     //         destinationDescription.textContent = data.cityDesc;
        
    //     //         const btnVisit = document.createElement('button');
    //     //         btnVisit.classList.add('buttons', 'buttons__visit');
    //     //         btnVisit.innerHTML = 'Visit';
        
        
    //     //         divCardDetails.appendChild(destinationName);
    //     //         divCardDetails.appendChild(destinationDescription);
    //     //         divCardDetails.appendChild(btnVisit);
        
        
    //     //         divSearchResultsCards.appendChild(imgCard);
    //     //         divSearchResultsCards.appendChild(divCardDetails);
        
                
    //     //         searchResultsSection.appendChild(divSearchResultsCards);
            
    //     //         divParentContainer.appendChild(searchResultsSection);


    //     //         // divParentContainer.classList.remove('invalid-search');
    //     //     } else{
    //     //         console.log('Data not found. Please modify your search (e.g. countries, temples, or beaches).');
    //     //     }
    //     // }



    //     // const templesData = [];
        
    //     // destinations.temples.forEach(temple => {
    //     //     // console.log(temple.name);
            
    //     //     templesData.push(temple.name);
    //     // })

    //     // console.log('Temples Data:', templesData);



    //     // const beachesData = [];

    //     // destinations.beaches.forEach(beach => {
    //     //     // console.log(beach.name);

    //     //     beachesData.push(beach.name);
    //     // })

    //     // console.log('Beaches Data:', beachesData);






    //     // console.log('User input:', input);
        
    //     // for (const country of countriesData) {
    //     //     console.log('Logging all countries data:', countriesData);
            
    //     //     let countryValue = country.countryName.toLowerCase();
    //     //     let cityValue = country.cityName.toLowerCase();

    //     //     if(input.includes(countryValue) || input.includes(cityValue)){
    //     //         console.log(`It's a match! Input ${input}, Value ${countryValue} ${cityValue}`);


    //     //         const divSearchResultsCards = document.createElement('div');
    //     //         divSearchResultsCards.classList.add('search-results__cards');

                
    //     //         const imgCard = document.createElement('img');
    //     //         imgCard.src = country.cityImage;
    //     //         imgCard.alt = country.cityName;
    //     //         imgCard.classList.add('search-results__card-images');
        
        
    //     //         const divCardDetails = document.createElement('div');
    //     //         divCardDetails.classList.add('search-results__card-details');
        
    //     //         const destinationName = document.createElement('h3');
    //     //         destinationName.classList.add('search-results__destination');
    //     //         destinationName.innerHTML = country.cityName;
        
    //     //         const destinationDescription = document.createElement('p');
    //     //         destinationDescription.classList.add('search-results__description');
    //     //         destinationDescription.textContent = country.cityDesc;
        
    //     //         const btnVisit = document.createElement('button');
    //     //         btnVisit.classList.add('buttons', 'buttons__visit');
    //     //         btnVisit.innerHTML = 'Visit';
        
        
    //     //         divCardDetails.appendChild(destinationName);
    //     //         divCardDetails.appendChild(destinationDescription);
    //     //         divCardDetails.appendChild(btnVisit);
        
        
    //     //         divSearchResultsCards.appendChild(imgCard);
    //     //         divSearchResultsCards.appendChild(divCardDetails);
        
                
    //     //         searchResultsSection.appendChild(divSearchResultsCards);
            
    //     //         divParentContainer.appendChild(searchResultsSection);


    //     //         // divParentContainer.classList.remove('invalid-search');


    //     //     } 
    //     //     // else if(input.includes(cityValue)){
    //     //     //     console.log(`It's a match! Input ${input} = Value ${cityValue}`);


    //     //     //     const divSearchResultsCards = document.createElement('div');
    //     //     //     divSearchResultsCards.classList.add('search-results__cards');

                
    //     //     //     const imgCard = document.createElement('img');
    //     //     //     imgCard.src = city.imgUrl;
    //     //     //     imgCard.alt = city.name;
    //     //     //     imgCard.classList.add('search-results__card-images');
        
        
    //     //     //     const divCardDetails = document.createElement('div');
    //     //     //     divCardDetails.classList.add('search-results__card-details');
        
    //     //     //     const destinationName = document.createElement('h3');
    //     //     //     destinationName.classList.add('search-results__destination');
    //     //     //     destinationName.innerHTML = city.name;
        
    //     //     //     const destinationDescription = document.createElement('p');
    //     //     //     destinationDescription.classList.add('search-results__description');
    //     //     //     destinationDescription.textContent = city.description;
        
    //     //     //     const btnVisit = document.createElement('button');
    //     //     //     btnVisit.classList.add('buttons', 'buttons__visit');
    //     //     //     btnVisit.innerHTML = 'Visit';
        
        
    //     //     //     divCardDetails.appendChild(destinationName);
    //     //     //     divCardDetails.appendChild(destinationDescription);
    //     //     //     divCardDetails.appendChild(btnVisit);
        
        
    //     //     //     divSearchResultsCards.appendChild(imgCard);
    //     //     //     divSearchResultsCards.appendChild(divCardDetails);
        
                
    //     //     //     searchResultsSection.appendChild(divSearchResultsCards);
            
    //     //     //     divParentContainer.appendChild(searchResultsSection);


    //     //     //     // divParentContainer.classList.remove('invalid-search');
    //     //     // } 
    //     //     else{
    //     //         divParentContainer.innerHTML = 'Data not found. Please modify your search (e.g. countries, temples, or beaches).';
    //     //         divParentContainer.classList.add('invalid-search');




    //     //         console.log('Data not found. Please modify your search (e.g. countries, temples, or beaches).');
    //     //     }

    //     //     // console.log('Country:', countryValue, 'City:', cityValue);
            
    //     // }
    // }

    


    
    // for(const [key, locations] of Object.entries(destinations)){

    //     locations.forEach(location => {
    //         const divSearchResultsCards = document.createElement('div');
    //         divSearchResultsCards.classList.add('search-results__cards');

            
    //         const imgCard = document.createElement('img');
    //         imgCard.src = location.imageUrl;
    //         imgCard.alt = location.name;
    //         imgCard.classList.add('search-results__card-images');
    
    
    //         const divCardDetails = document.createElement('div');
    //         divCardDetails.classList.add('search-results__card-details');
    
    //         const destinationName = document.createElement('h3');
    //         destinationName.classList.add('search-results__destination');
    //         destinationName.innerHTML = location.name;
    
    //         const destinationDescription = document.createElement('p');
    //         destinationDescription.classList.add('search-results__description');
    //         destinationDescription.textContent = location.description;
    
    //         const btnVisit = document.createElement('button');
    //         btnVisit.classList.add('buttons', 'buttons__visit');
    //         btnVisit.innerHTML = 'Visit';
    
    
    //         divCardDetails.appendChild(destinationName);
    //         divCardDetails.appendChild(destinationDescription);
    //         divCardDetails.appendChild(btnVisit);
    
    
    //         divSearchResultsCards.appendChild(imgCard);
    //         divSearchResultsCards.appendChild(divCardDetails);
    
            
    //         searchResultsSection.appendChild(divSearchResultsCards);
            


    //         if(key === 'countries'){
    //             location.cities.forEach(city => {
    //                 const imgCard = document.createElement('img');
    //                 imgCard.src = city.imageUrl;
    //                 imgCard.alt = city.name;
    //                 imgCard.classList.add('search-results__card-images');
            
            
    //                 const divCardDetails = document.createElement('div');
    //                 divCardDetails.classList.add('search-results__card-details');
            
    //                 const destinationName = document.createElement('h3');
    //                 destinationName.classList.add('search-results__destination');
    //                 destinationName.innerHTML = city.name;
            
    //                 const destinationDescription = document.createElement('p');
    //                 destinationDescription.classList.add('search-results__description');
    //                 destinationDescription.textContent = city.description;
            
    //                 const btnVisit = document.createElement('button');
    //                 btnVisit.classList.add('buttons', 'buttons__visit');
    //                 btnVisit.innerHTML = 'Visit';
            
            
    //                 divCardDetails.appendChild(destinationName);
    //                 divCardDetails.appendChild(destinationDescription);
    //                 divCardDetails.appendChild(btnVisit);
            
            
    //                 divSearchResultsCards.appendChild(imgCard);
    //                 divSearchResultsCards.appendChild(divCardDetails);
            
                    
    //                 searchResultsSection.appendChild(divSearchResultsCards);
    //             })
    //         }
    //     });
    // }

    // divParentContainer.appendChild(searchResultsSection);
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