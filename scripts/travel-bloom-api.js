export async function getJsonData(){
    try {
        const response = await axios.get('../scripts/data/travel-bloom.json');
        // const destination = response.data;
        // console.log(destination);
        // console.log(response);
        // return destination;
        return response.data;
    } catch (error) {
        console.error('No data found. Please modify your search.', error.response?.status, error.message);
    }
}

export async function getTimeZone(country){
    const apiUrl = `http://worldtimeapi.org/api/timezone/${country}`;
    
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.log('Timezone not found.');
    }
}