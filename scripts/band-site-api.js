const apiKey = 'cb73002f-6277-4e76-9845-fec9cc772c30';

class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/';
    }

    async postComment(comment){
        try {
            const newComment = await axios.post(`${this.baseUrl}/comments?api_key=${this.apiKey}`, comment);
            console.log(newComment);
            
            return newComment;
            
        } catch (error) {
            console.error(error);
        }
    }

    async getComments(){
        try {
            const response = await axios.get(`${this.baseUrl}/comments?api_key=${this.apiKey}`);
            return response.data;
            
        } catch (error) {
            console.error(error);
        }
    }
}



