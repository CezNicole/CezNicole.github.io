const comments = [
    {name: 'Victor Pinto', date: '11/02/2023', comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."},
    {name: 'Christina Cabrera', date:'10/28/2023', comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."},
    {name: 'Isaac Tadesse', date: '10/20/2023', comment:"I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."},
];

console.log(comments);

const form = document.querySelector('.form');
const nameInput = document.getElementById('commenter');
const commentInput = document.getElementById('commentText');

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
        // console.log(commenter, commentText);
        let newComment = {
            name: commenter,
            date: new Date().toLocaleDateString('en-US'),
            comment: commentText,
        };

        comments.push(newComment);
        comments.forEach(comm => {
            console.log(comm.name, comm.date, comm.comment);
        });
        
        form.reset();
    }
})


const commentsSection = document.querySelector('.comment-section__comments');

comments.forEach(comment => {

    const profilePic = document.createElement('div');
    profilePic.classList.add('profile-pic');
    
    const nameElement = document.createElement('h3');
    nameElement.classList.add('comment-section__name');
    nameElement.textContent = comment.name;
    
    const divider = document.createElement('div');
    divider.classList.add('divider');
    
    commentsSection.appendChild(profilePic);
    commentsSection.appendChild(nameElement);
    commentsSection.appendChild(divider);
});