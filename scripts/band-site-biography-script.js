import {getComments, postComment} from "./band-site-api.js";

// Refactoring code to use axios
const form = document.querySelector('.form');
const nameInput = document.getElementById('commenter');
const commentInput = document.getElementById('commentText');
const commentsSection = document.querySelector('.comment-section__comments');

let allComments = [];


async function loadAllComments(){
    try {
        allComments = await getComments();
        // allComments.sort((a, b) => b.timestamp - a.timestamp);
        renderComments(allComments);
    } catch (error) {
        console.error(`Error loading comments:`, error.response?.status, error.message);
    }
}


async function handleFormSubmit(event){
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

        try {
            const postedComment = await postComment(newComment);
            // await postComment(newComment);
            allComments.unshift(postedComment);
            // await loadAllComments();
            renderComments(allComments)
            form.reset();
        } catch (error) {
            console.error(`Error submitting comment:`, error.response?.status, error.message);
        }
    }
}


function renderComments(comments){
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
        dateElement.textContent = new Date(comment.timestamp).toLocaleDateString();
    
    
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


// Form Validation
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


form.addEventListener('submit', handleFormSubmit);


loadAllComments();