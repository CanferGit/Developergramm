
let users = [
    {
        "name": "Bunhan",
        "userimg": "img/bunhan.jpg",
        "coordinaten": "Switzerland",
        "postimg": "img/post1.jpg",
        "likes": 23,
        "isLiked": false,
        "newcomment": [{ text: 'Fleissig, fleissig.. wunderbare Landschaft, wo genau bist du denn?', isDeletable: false }],
        "postname": ['Jorg'],
    },

    {
        "name": "Dj",
        "userimg": "img/dj.jpg",
        "coordinaten": "Rhodos",
        "postimg": "img/post2.jpg",
        "likes": 11,
        "isLiked": false,
        "newcomment": [{ text: 'Schöne Drohnenaufnahme, Rhodos sieht echt nice aus', isDeletable: false }],
        "postname": ['Bunhan'],
    },

    {
        "name": "Green",
        "userimg": "img/green.jpg",
        "coordinaten": "Switzerland",
        "postimg": "img/post3.jpg",
        "likes": 54,
        "isLiked": false,
        "newcomment": [{ text: 'Die beste Abkühlung nach einer langen Wanderung...', isDeletable: false }],
        "postname": ['Dj'],
    },

    {
        "name": "Jorg",
        "userimg": "img/jorg.jpg",
        "coordinaten": "Dubai",
        "postimg": "img/post4.jpg",
        "likes": 22,
        "isLiked": false,
        "newcomment": [{ text: 'Ohjaa Bier, sei dir gegönnt!', isDeletable: false }],
        "postname": ['Green'],
    },
];



    function load() {
    let storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }
    renderPosts();
}

function renderPosts() {
    let createPost = document.getElementById('posts');
    createPost.innerHTML = '';
    
    for (let i = 0; i < users.length; i++) {
        const post = users[i];
        
        createPost.innerHTML += `
        <div class="firstpostcontain" id="postcontent">
            <div class="userimg" id="userimg${i}">
                <img src="${post['userimg']}">
                <div class="usersettings">
                    <div class="username">${post['name']}</div>
                    <div class="userlocation">${post['coordinaten']}</div>
                </div>
            </div>
            <div class="postimg">
                <img src="${post['postimg']}" />
            </div>
            <div class="postbuttons">
                <div class="buttons">
                    <img src="${post.isLiked ? 'img/herz.rot.png' : 'img/herz.png'}" id="heart${i}" onclick="toggleHeart(${i})" />
                    <img src="img/kommentar.png" />
                    <img src="img/papierflieger.png" />
                </div>
                <div class="lesezeichenbutton">
                    <img src="img/lesezeichen.png" />
                </div>
            </div>
            <div class="likes" id="likes">Gefällt ${post['likes']} mal</div>
            <div class="comments" id="comments${i}"></div>
            <div class="newpost">
                <input class="inputfield" id="input${i}" placeholder="schreibe ein Kommentar....">
                <button onclick="pushComment(${i})" class="createpostbutton">Posten</button>
            </div>
        </div>`;
        
        let postcomments = document.getElementById(`comments${i}`);
        
        for (let j = 0; j < post['newcomment'].length; j++) {
            const commentData = post['newcomment'][j];
            const comment = commentData.text;
            const isDeletable = commentData.isDeletable;
            const commentAuthor = post['postname'][j];
            
            postcomments.innerHTML += `
            <div class="mypost" id="comment${i}-${j}">
                <span><b>${commentAuthor}:</b> ${comment}</span>
                ${isDeletable ? `<button class="deletepost" onclick="deleteComment(${i}, ${j})">X</button>` : ''}
            </div>`;
        }
    }
}

function toggleHeart(index) {
    users[index].isLiked = !users[index].isLiked;
    if (users[index].isLiked) users[index].likes++;
    else users[index].likes--;
    
    localStorage.setItem('users', JSON.stringify(users));
    renderPosts();
}

function pushComment(index) {
    let inputElement = document.getElementById(`input${index}`);
    let comment = inputElement.value;
    if(comment.trim() === "") return;
    
    users[index].newcomment.push({ text: comment, isDeletable: true });
    users[index].postname.push('Ich');
    
    inputElement.value = '';
    localStorage.setItem('users', JSON.stringify(users));
    renderPosts();
}

function deleteComment(userIndex, commentIndex) {
    users[userIndex].newcomment.splice(commentIndex, 1);
    users[userIndex].postname.splice(commentIndex, 1);
    
    localStorage.setItem('users', JSON.stringify(users));
    renderPosts();
}