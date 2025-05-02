const shows = [
    {date: 'Mon Sept 09 2024', venue: 'Ronald Lane', location: 'San Francisco, CA'},
    {date: 'Tue Sept 17 2024', venue: 'Pier 3 East', location: 'San Francisco, CA'},
    {date: 'Sat Oct 12 2024', venue: 'View Lounge', location: 'San Francisco, CA'},
    {date: 'Sat Nov 16 2024', venue: 'Hyatt Agency', location: 'San Francisco, CA'},
    {date: 'Fri Nov 29 2024', venue: 'Moscow Center', location: 'San Francisco, CA'},
    {date: 'Wed Dec 18 2024', venue: 'Press Club', location: 'San Francisco, CA'},
];


const showsContainer = document.querySelector('.shows__container');


shows.forEach((show) => {
    const showsSubcontainer = document.createElement('div');
    showsSubcontainer.classList.add('shows-section');

    const dateHeading = document.createElement('h3');
    dateHeading.innerHTML = 'DATE';
    dateHeading.classList.add('shows-section__headings');

    const dateValue = document.createElement('div');
    dateValue.innerHTML = show.date;
    dateValue.classList.add('shows-section__shows-info');
    dateValue.classList.add('shows-section__shows-info--bold');


    const venueHeading = document.createElement('h3');
    venueHeading.innerHTML = 'VENUE';
    venueHeading.classList.add('shows-section__headings');

    const venueValue = document.createElement('div');
    venueValue.innerHTML = show.venue;
    venueValue.classList.add('shows-section__shows-info');
    

    const locationHeading = document.createElement('h3');
    locationHeading.innerHTML = 'LOCATION';
    locationHeading.classList.add('shows-section__headings');

    const locationValue = document.createElement('div');
    locationValue.innerHTML = show.location;
    locationValue.classList.add('shows-section__shows-info');


    const button = document.createElement('button');
    button.textContent = 'BUY TICKETS';
    button.classList.add('button');

    
    showsSubcontainer.appendChild(dateHeading);
    showsSubcontainer.appendChild(dateValue);
    showsSubcontainer.appendChild(venueHeading);
    showsSubcontainer.appendChild(venueValue);
    showsSubcontainer.appendChild(locationHeading);
    showsSubcontainer.appendChild(locationValue);
    showsSubcontainer.appendChild(button);


    const dividerContainer = document.createElement('div');
    const divider = document.createElement('div');
    divider.classList.add('divider');

    dividerContainer.appendChild(divider);

    showsContainer.appendChild(showsSubcontainer);
    showsContainer.appendChild(dividerContainer);
})

    

