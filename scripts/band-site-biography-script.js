// Refactoring code to use axios
const apiKey = 'cb73002f-6277-4e76-9845-fec9cc772c30';
const baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/';

let allComments = [];


async function getComments(){
    try {
        const response = await axios.get(`${baseUrl}comments?api_key=${apiKey}`);
        allComments = response.data;
        console.log('Loading comments:', allComments);

        displayComments(allComments);

    } catch (error) {
        console.error('Error loading comments:', error)
    }
}


async function postComment(comment){
    const nameInput = document.getElementById('commenter').value.trim();
    const commentInput = document.getElementById('commentText').value.trim();

    try {
        if(nameInput && commentInput){
            const response = await axios.post(`${baseUrl}comments?api_key=${apiKey}`, comment);
    
            const newComment = response.data;
            allComments.unshift(newComment);
            console.log(allComments);

            displayComments(allComments);
        } 
    } catch (error) {
        console.error('Error submitting comment:', error);
    }
}


const form = document.querySelector('.form');
const nameInput = document.getElementById('commenter');
const commentInput = document.getElementById('commentText');

nameInput.addEventListener('input', () => {
    if(nameInput.value.trim()){
        nameInput.classList.remove('error');
    }
})

commentInput.addEventListener('input', () => {
    if(commentInput.value.trim()){
        commentInput.classList.remove('error');
    }
})


form.addEventListener('submit', (event) => {
    event.preventDefault();

    let commenter = nameInput.value.trim();
    let commentText = commentInput.value.trim();
    let hasError = false;

    if(!commenter){
        nameInput.classList.add('error');
        hasError = true;
    } else{
        nameInput.classList.remove('error');
    }

    if(!commentText){
        commentInput.classList.add('error');
        hasError = true;
    } else{
        commentInput.classList.remove('error');
    }

    if(!hasError){
        let newComment = {
            name: commenter,
            comment: commentText,
        };

        postComment(newComment);
        form.reset();
    }
})


function displayComments(comments){
    const commentsSection = document.querySelector('.comment-section__comments');

    commentsSection.innerHTML = '';

    comments.forEach(comment => {
    
        const profilePic = document.createElement('div');
        profilePic.classList.add('profile-pic');
        
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('comment-section__dynamic-container');
    

        const nameElement = document.createElement('div');
        nameElement.classList.add('comment-section__name');
        nameElement.textContent = comment.name;

        const dateElement = document.createElement('div');
        dateElement.classList.add('comment-section__date');
        dateElement.textContent = comment.date;
    
    
        containerDiv.appendChild(nameElement);
        containerDiv.appendChild(dateElement);
    
    
        const commentElement = document.createElement('p');
        commentElement.classList.add('comment-section__comment');
        commentElement.textContent = comment.comment;
    
    
        const divider = document.createElement('div');
        divider.classList.add('divider');
        divider.classList.add('divider--bottom');
        
        commentsSection.appendChild(profilePic);
        commentsSection.appendChild(containerDiv);
        commentsSection.appendChild(commentElement);
        commentsSection.appendChild(divider);
    });
}


getComments();