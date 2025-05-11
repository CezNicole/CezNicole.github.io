// const comments = [
//     {name: 'Victor Pinto', date: '11/02/2023', comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."},
//     {name: 'Christina Cabrera', date:'10/28/2023', comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."},
//     {name: 'Isaac Tadesse', date: '10/20/2023', comment:"I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."},
// ];


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
    // comment = {};
    
    const nameInput = document.getElementById('commenter').value.trim();
    const commentInput = document.getElementById('commentText').value.trim();

    // comment = {
    //     name: nameInput,
    //     comment: commentInput
    // }
    
    try {
        // let comments = [];

        if(nameInput && commentInput){
            const response = await axios.post(`${baseUrl}comments?api_key=${apiKey}`, comment);
    
            const newComment = response.data;
            allComments.unshift(newComment);
            console.log(allComments);

            // getComments();
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

        // comments.unshift(newComment);
        // displayComments();
        
        postComment(newComment);
        form.reset();
        // getComments();
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
        // console.log(comment.comment);
        
    
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
        // commentsSection.appendChild(nameElement);
        // commentsSection.appendChild(dateElement);
        commentsSection.appendChild(containerDiv);
        commentsSection.appendChild(commentElement);
        commentsSection.appendChild(divider);

        // allComments.push(comments);
    });
}


// const commentsSection = document.querySelector('.comment-section__comments');

// function displayComments(){
//     commentsSection.innerHTML = '';

//     comments.forEach(comment => {
    
//         const profilePic = document.createElement('div');
//         profilePic.classList.add('profile-pic');
        
//         const containerDiv = document.createElement('div');
//         containerDiv.classList.add('comment-section__dynamic-container');
    
//         const nameElement = document.createElement('div');
//         nameElement.classList.add('comment-section__name');
//         nameElement.textContent = comment.name;
//         console.log(comment.comment);
        
    
//         const dateElement = document.createElement('div');
//         dateElement.classList.add('comment-section__date');
//         dateElement.textContent = comment.date;
    
    
//         containerDiv.appendChild(nameElement);
//         containerDiv.appendChild(dateElement);
    
    
//         const commentElement = document.createElement('p');
//         commentElement.classList.add('comment-section__comment');
//         commentElement.textContent = comment.comment;
    
    
        
    
//         const divider = document.createElement('div');
//         divider.classList.add('divider');
//         divider.classList.add('divider--bottom');
        
//         commentsSection.appendChild(profilePic);
//         // commentsSection.appendChild(nameElement);
//         // commentsSection.appendChild(dateElement);
//         commentsSection.appendChild(containerDiv);
//         commentsSection.appendChild(commentElement);
//         commentsSection.appendChild(divider);
//     });
// }

// displayComments();
getComments();