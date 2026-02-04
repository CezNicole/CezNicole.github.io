export async function getProjects(){
    try {
        const response = await axios.get('../scripts/data/cybersecurity-projects.json');
        return response.data.projects;
    } catch (error) {
        console.log('Error fetching data', error);
    }
}