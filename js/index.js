const bookList = document.getElementById("list");
const showPanel = document.getElementById("show-panel");

function getBooks() {
    fetch("http://localhost:3000/books")
        .then(response => response.json())
        .then(data => data.forEach(book => renderBook(book)));
}

function renderBook(book) {
    // render book
    let newBookItem = document.createElement("li");
    newBookItem.innerHTML = book.title;
    bookList.appendChild(newBookItem);

    // make book clickable
    newBookItem.addEventListener("click", () => showBook(book));
}

function showBook(book) {
    showPanel.innerHTML = 
        `
        <img src=${book.img_url}/>
        <h1>${book.title}</h1>
        <h2>${book.subtitle}</h2>
        <h3>${book.author}</h3>
        <p>${book.description}</p>
        <p>Likers:</p>
        <ul id="likers-list"></ul>
        <button id="like-button">LIKE</button>
        `
    const likersList = document.getElementById("likers-list");
    book.users.forEach(user => createLiker(user, likersList));

    const likeButton = document.getElementById("like-button");
    likeButton.addEventListener("click", () => likeBook(book));
}

function createLiker(user, likersList) {
    let newUserItem = document.createElement("li");
    newUserItem.innerHTML = user.username;
    likersList.appendChild(newUserItem);
}

function likeBook(book) {
    book.users.push({"id":1, "username":"pouros"});
    let patchBody = book.users;

    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({users: patchBody})
    };

    fetch(`http://localhost:3000/books/${book.id}`, configObj)
        .then(response => response.json())
        .then(() => createLiker(book.users[book.users.length - 1], document.getElementById("likers-list")));
}

getBooks();