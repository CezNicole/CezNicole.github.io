export async function getJsonData(){
    try {
        const response = await axios.get('../scripts/data/travel-bloom.json');
        const destination = response.data;
        console.log(destination);
        return destination;
    } catch (error) {
        console.error('No data found. Please modify your search.', error.response?.status, error.message);
    }
}