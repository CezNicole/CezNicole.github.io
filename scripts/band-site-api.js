const apiKey = 'cb73002f-6277-4e76-9845-fec9cc772c30';
const baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/';

export async function getComments(){
    try {
        const response = await axios.get(`${baseUrl}comments?api_key=${apiKey}`);
        console.log('Loading comments:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error loading comments:', error.response?.status, error.message);
    }
}


export async function postComment(comment){
    try {
        const response = await axios.post(`${baseUrl}comments?api_key=${apiKey}`, comment);

        const newComment = response.data;
        newComment.isUserAdded = true;        
        
        console.log('Posting comment:', response.data);
        return newComment;
    } catch (error) {
        console.error('Error posting comment:', error.response?.status, error.message);
    }
}


export async function deleteComment(commentId){
    try {
        const response = await axios.delete(`${baseUrl}comments/${commentId}?api_key=${apiKey}`);
        console.log('Deleting comment:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', error.response?.status, error.message);
    }
}


export async function getShows(){
    try {
        const response = await axios.get(`${baseUrl}showdates?api_key=${apiKey}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching show dates:', error.response?.status, error.message);
    }
}