/* eslint-disable no-unused-vars */
// eslint-disable-next-line max-classes-per-file
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    this.books = this.loadBooksFromLocalStorage();
  }

  addBook(title, author) {
    const newBook = new Book(title, author);
    this.books.push(newBook);
    this.saveBooksToLocalStorage();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.saveBooksToLocalStorage();
  }

  // Save updated collection to localStorage
  saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  loadBooksFromLocalStorage() {
    const storedBooks = this.localStorage.getItem('books');
    return storedBooks ? JSON.parse(storedBooks) : [];
  }

  getBooks() {
    return this.books;
  }
}

const bookCollection = new BookCollection();

// Display books in the collection
function displayBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';
  bookCollection.getBooks().forEach((book, index) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.innerHTML = `      <div class="book-info">
    <span>"${book.title}"</span>
    <span> by ${book.author}</span>
  </div>
  <div class="btn-container">
    <button onclick="removeBook(${index})">Remove</button>
  </div>
`;
    bookList.appendChild(bookElement);
  });
}
// Add a new book to the collection
function addBook() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title && author) {
    bookCollection.addBook(title, author);
    titleInput.value = '';
    authorInput.value = '';

    displayBooks();
  }
}

// Remove a book from the collection
function removeBook(index) {
  bookCollection.removeBook(index);
  displayBooks();
}
displayBooks();