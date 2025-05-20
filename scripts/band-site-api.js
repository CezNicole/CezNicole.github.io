// const apiKey = 'cb73002f-6277-4e76-9845-fec9cc772c30';
// const baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/';

// export async function getComments(){
//     try {
//         const response = await axios.get(`${baseUrl}comments?api_key=${apiKey}`);
//         console.log('Loading comments:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error loading comments:', error.response?.status, error.message);
//     }
// }


// export async function postComment(comment){
//     try {
//         const response = await axios.post(`${baseUrl}comments?api_key=${apiKey}`, comment);

//         const newComment = response.data;
//         newComment.isUserAdded = true;        
        
//         console.log('Posting comment:', response.data);
//         return newComment;
//     } catch (error) {
//         console.error('Error posting comment:', error.response?.status, error.message);
//     }
// }


// export async function deleteComment(commentId){
//     try {
//         const response = await axios.delete(`${baseUrl}comments/${commentId}?api_key=${apiKey}`);
//         console.log('Deleting comment:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error deleting comment:', error.response?.status, error.message);
//     }
// }


// export async function likeComment(commentId){
//     try {
//         const response = await axios.put(`${baseUrl}comments/${commentId}/like?api_key=${apiKey}`);
//         console.log('Liking comment:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error liking comment:', error.respons?.status, error.message);
//     }
// }


// export async function getShows(){
//     try {
//         const response = await axios.get(`${baseUrl}showdates?api_key=${apiKey}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching show dates:', error.response?.status, error.message);
//     }
// }


// Refactor functions into a class
export default class BandSiteApi{
    apiKey = 'cb73002f-6277-4e76-9845-fec9cc772c30';
    
    
    constructor(apiKey){
        this.apiKey = apiKey;
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/';
    }

    async getComments(){
        try {
            const response = await axios.get(`${this.baseUrl}comments?api_key=${this.apiKey}`);
            console.log('Fetching comments:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching comments:', error.response?.status, error.message);
        }
    }

    async postComment(comment){
        try {
            const response = await axios.post(`${this.baseUrl}comments?api_key=${this.apiKey}`, comment);
            console.log('Posting comment:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error posting comment:', error.response?.status, error.message);
        }
    }

    async deleteComment(commentId){
        try {
            const response = await axios.delete(`${this.baseUrl}comments/${commentId}?api_key=${this.apiKey}`);
            console.log('Successfully deleted comment:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting comment:', error.response?.status, error.message);
        }
    }

    async likeComment(commentId){
        try {
            const response = await axios.put(`${this.baseUrl}comments/${commentId}/like?api_key=${this.apiKey}`);
            console.log('Successfully liked comment:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating comment likes:', error.response?.status, error.message);
        }
    }




    async getShows(){
        try {
            const response = await axios.get(`${this.baseUrl}showdates?api_key=${this.apiKey}`);
            console.log('Fetching show dates:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching show dates:', error.response?.status, error.message);
        }
    }
}