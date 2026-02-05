export async function getProjects(){
    try {
        const response = await axios.get('../scripts/data/cybersecurity-projects.json');
        return response.data.projects;
    } catch (error) {
        console.log('Error fetching project data', error);
    }
}

export async function getHighlightedSkills(){
    try {
        const response = await axios.get('../scripts/data/highlighted-skills.json');
        return response.data.skills;
    } catch (error) {
        console.log('Error fetching skill data', error);
    }
}