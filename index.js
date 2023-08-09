const booksArrays = [];
let booksObject = {};

//function to add book
function addBook(e) {
  e.preventDefault();
  const titleInput = document.getElementById("title").value;
  const authorInput = document.getElementById("author").value;
  const id = Math.floor(Math.random() * 1000);
  booksObject = { author: authorInput, title: titleInput, id: id };
  booksArrays.push(booksObject);
  displayBook(booksObject);
  localStorage.setItem("bookStore", JSON.stringify(booksArrays));
}

const container = document.getElementById("books");

//function to display book
function displayBook(booksObject) {
  const bookAuthor = document.createElement("p");
  const removeButton = document.createElement("button");
  const horizontalLine = document.createElement("hr");
  bookAuthor.innerText = `${booksObject.title} by ${booksObject.author}`;
  removeButton.innerText = "Remove";
  removeButton.className = "button";
  removeButton.setAttribute("data-id", booksObject.id);
  removeButton.addEventListener("click", function () {
    deleteBook(removeButton);
    container.removeChild(removeButton);
    container.removeChild(bookAuthor);
    container.removeChild(horizontalLine);
  });
  container.appendChild(bookAuthor);
  container.appendChild(removeButton);
  container.appendChild(horizontalLine);
}

let booksFromStorage = JSON.parse(localStorage.getItem("bookStore")) || [];

//function to delete book
function deleteBook(button) {
  const btnId = Number(button.getAttribute("data-id"));
  const newBooks = booksFromStorage.filter((book) => book.id === btnId);
  localStorage.setItem("bookStore", JSON.stringify(newBooks));
  booksFromStorage = newBooks;
}

//display books;
function loopBooks() {
  booksFromStorage.map((book) => {
    displayBook(book);
  });
}
