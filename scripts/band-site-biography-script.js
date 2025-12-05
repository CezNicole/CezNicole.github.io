// import {getComments, postComment, deleteComment, likeComment} from "./band-site-api.js";
import BandSiteApi from "./band-site-api.js";


// Refactoring code to use axios
const form = document.querySelector('.form');
const nameInput = document.getElementById('commenter');
const commentInput = document.getElementById('commentText');
const commentsSection = document.querySelector('.comment-section__comments');

let allComments = [];
// const pageLoad = Date.now();
// const maxTimestamp = await checkMaxTimestamp();


// Creating an instance of BandSiteApi class
const bandSiteApi = new BandSiteApi();


async function loadAllComments(){
    try {
        // allComments = await getComments();
        allComments = await bandSiteApi.getComments();
        

        allComments = allComments.map(comment => {
            return {
                ...comment,
                liked: false
            }
        })

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

            // postedComment.isOriginal = false;
            allComments.unshift(postedComment);
            renderComments(allComments)
            // await postComment(newComment);
            // await loadAllComments();
            form.reset();
        } catch (error) {
            console.error(`Error submitting comment:`, error.response?.status, error.message);
        }
    }
}


function createLikeButton(comment){
    const btnLike = document.createElement('a');
    btnLike.href = '#';
    btnLike.classList.add('comment-section__like-button');

    if(comment.liked){
        btnLike.classList.add('comment-section__like-button--liked');
    }

    btnLike.addEventListener('click', (event) => {
        event.preventDefault();
        likeComment(event, comment.id);
    });

    return btnLike;
}


function createDeleteButton(comment){
    const btnDelete = document.createElement('a');
    btnDelete.href = '#';
    btnDelete.classList.add('comment-section__delete-button');
    

    // Add delete button only on newly added comments via POST method
    // Convert date into a number for correct comparison
    const commentDate = new Date(comment.timestamp).getTime();
    const cutOffDate = new Date('2/17/2021').getTime();

    if(commentDate <= cutOffDate){
        btnDelete.classList.add('hidden');
    }


    btnDelete.addEventListener('click', (event) => {
        btnDelete.disabled = true;
        deletePostedComment(event, comment.id)
    });


    return btnDelete;
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


        // const btnLike = document.createElement('a');
        // btnLike.href = '#';
        // btnLike.classList.add('comment-section__like-button');
        // btnLike.addEventListener('click', (event) => {
        //     likeComment(event, comment.id);
        //     btnLike.classList.add('comment-section__like-button--liked');
        // });

        
        // const btnDelete = document.createElement('a');
        // btnDelete.href = '#';
        // btnDelete.classList.add('comment-section__delete-button');
        

        // // Add delete button only on newly added comments via POST method
        // const commentDate = new Date(comment.timestamp).getTime();
        // const cutOffDate = new Date('2/17/2021').getTime();

        // if(commentDate <= cutOffDate){
        //     btnDelete.classList.add('hidden');
        // }

        const btnLike = createLikeButton(comment);

        // btnDelete.addEventListener('click', (event) => {
        //     btnDelete.disabled = true;
        //     deletePostedComment(event, comment.id)
        // });

        const btnDelete = createDeleteButton(comment);


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
        await bandSiteApi.deleteComment(commentId)
        allComments = allComments.filter(comment => commentId !== comment.id);
        renderComments(allComments);
    } catch (error) {
        console.error('Failed to delete comment:', error.response?.status, error.message);
    }
}


async function likeComment(event, commentId){
    event.preventDefault();

    const comment = allComments.find(c => c.id === commentId)

    // If the comment doesn't exist, stop the function
    if(!comment){
        return;
    }
    

    // To toggle the like/unlike visual change and state
    const btnLike = event.currentTarget;
    const newLikedState = !comment.liked;

    
    try {
        if(newLikedState){
            await bandSiteApi.likeComment(commentId);
            comment.likes++;
        } else{
            await unlikeComment(comment);
        }
        
        // allComments = allComments.map(comment => {
        //     if(comment.id === commentId){
        //         return{
        //             ...comment,
        //             liked: newLikedState,
        //             like: newLikedState ? comment.like + 1 : comment.like - 1
        //         }
        //     }
        //     return comment;
        // })


        // Update comment directly
        comment.liked = newLikedState;
       

        // Change like button color
        if (comment.liked) {
            btnLike.classList.add('comment-section__like-button--liked');
        } else {
            btnLike.classList.remove('comment-section__like-button--liked');
        }

        renderComments(allComments);
        
    } catch (error) {
        console.error('Failed to like comment:', error.response?.status, error.message);
    }
}


async function unlikeComment(comment){
    try {
        comment.liked = false;
        comment.likes--;
    } catch (error) {
        console.error('Failed to unlike comment:', error.response?.status, error.message);
    }
}


// async function checkMaxTimestamp(){
//     const allApiComments = await getComments();
//     const originalApiComments = allApiComments.filter(comment => {
//         return new Date(comment.timestamp).getTime() < pageLoad;
//     });
//     console.log('Original API Comments:', originalApiComments);

//     const timestamps = originalApiComments.map(comment => new Date(comment.timestamp));
//     const maxTimestamp = new Date(Math.max(...timestamps));
//     const convertedMaxTimestamp = maxTimestamp.toLocaleDateString('en-US');
//     console.log('Converted Max Timestamp:', convertedMaxTimestamp);

//     return maxTimestamp;
// }