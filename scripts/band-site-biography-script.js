// import {getComments, postComment, deleteComment, likeComment} from "./band-site-api.js";
import BandSiteApi from "./band-site-api.js";


// Refactoring code to use axios
const form = document.querySelector('.form');
const nameInput = document.getElementById('commenter');
const commentInput = document.getElementById('commentText');
const commentsSection = document.querySelector('.comment-section__comments');

let allComments = [];


// Creating an instance of BandSiteApi class
const bandSiteApi = new BandSiteApi();


async function loadAllComments(){
    try {
        // allComments = await getComments();
        allComments = await bandSiteApi.getComments();
        
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
            // const postedComment = await postComment(newComment);
            const postedComment = await bandSiteApi.postComment(newComment);

            allComments.unshift(postedComment);
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
    
        const parentContainerDiv = document.createElement('div');
        parentContainerDiv.classList.add('comment-section__dynamic-parent-container');


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


        const btnLike = document.createElement('a');
        btnLike.href = '#';
        btnLike.classList.add('comment-section__like-button');
        btnLike.addEventListener('click', (event) => {
            likeExistingComment(event, comment.id);
            btnLike.classList.add('comment-section__like-button--liked');
        });

        
        const btnDelete = document.createElement('a');
        btnDelete.href = '#';
        btnDelete.classList.add('comment-section__delete-button');
        

        // Add delete button only on newly added comments via POST method
        if(dateElement.textContent <= '2/17/2021'){
            btnDelete.classList.add('hidden');
        }

        
        btnDelete.addEventListener('click', (event) => deletePostedComment(event, comment.id));


        containerDiv.appendChild(nameElement);
        containerDiv.appendChild(dateElement);

        parentContainerDiv.appendChild(containerDiv);
        parentContainerDiv.appendChild(btnLike);
        parentContainerDiv.appendChild(btnDelete);

    
        const commentElement = document.createElement('p');
        commentElement.classList.add('comment-section__comment');
        commentElement.textContent = comment.comment;
    
    
        const divider = document.createElement('div');
        divider.classList.add('divider');
        divider.classList.add('divider--bottom');
        
        commentsSection.appendChild(profilePic);
        
        commentsSection.appendChild(parentContainerDiv);

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


async function deletePostedComment(event, commentId){
    event.preventDefault();

    try {
        // await deleteComment(commentId);
        bandSiteApi.deleteComment(commentId)
        
        allComments = allComments.filter(comment => commentId !== comment.id);
        renderComments(allComments);
    } catch (error) {
        console.error('Failed to delete comment:', error.response?.status, error.message);
    }
}


async function likeExistingComment(event, commentId){
    event.preventDefault();
    
    try {
        // await likeComment(commentId);
        bandSiteApi.likeComment(commentId)
        
        allComments = allComments.map(comment => {
            if(comment.id === commentId){
                comment.like++;
            } else{
                console.log('Comment ID not found', error);
            }
        })
       
        renderComments(allComments);
    } catch (error) {
        console.error('Failed to like comment:', error.response?.status, error.message);
    }
}
