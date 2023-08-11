/* eslint-disable max-classes-per-file */
const form = document.querySelector('.form');
const msg = document.querySelector('.msg');
const bookList = document.querySelector('.book-list');

function Books(id, title, author) {
  this.id = id;
  this.title = title;
  this.author = author;
}

class UI {
  // Create Display book on the UI
  displayBooks(newBook) {
    const li = document.createElement('li');
    li.id = newBook.id;
    li.innerHTML = `
    <p>"${newBook.title}" by ${newBook.author}</p>
    <button id="remove" type="button">Remove</button>
  `;
    this.displayBooks = bookList.appendChild(li);
  }

  // Display messages to the UI
  showMessage(message, isSuccess) {
    msg.innerText = message;
    this.showMessage = msg.classList.add(isSuccess ? 'success' : 'error');
    setTimeout(() => {
      this.showMessage = msg.classList.remove('success', 'error');
      msg.innerText = '';
    }, 3000);
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addToLocalStorage(newBook) {
    const books = Store.getBooks();
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static displayFromLocalStorage() {
    const books = Store.getBooks();

    const ui = new UI();
    books.forEach((book) => {
      ui.displayBooks(book);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Store.displayFromLocalStorage();
});

// Add books
form.addEventListener('submit', (e) => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const id = Math.random() * 2 + title; // Updated id calculation
  // check for any errors
  if (title.trim() === '' || author.trim() === '') {
    const errorMessage = 'All fields are required';
    const ui = new UI();
    ui.showMessage(errorMessage, false);
  } else {
    // Init the books object
    const newBook = new Books(id, title, author);

    const ui = new UI();

    // Display book on the UI
    ui.displayBooks(newBook);

    // Save books data to localStorage
    Store.addToLocalStorage(newBook);

    const successMessage = 'Book added successfully';
    ui.showMessage(successMessage, true);

    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
  // prevent default submit
  e.preventDefault();
});

// Remove books
bookList.addEventListener('click', (e) => {
  if (e.target.id === 'remove') {
    const books = Store.getBooks();
    const liParent = e.target.parentElement;

    const filteredBooks = books.filter(
      (book) => book.id !== liParent.id,
    );
    liParent.remove();
    localStorage.setItem('books', JSON.stringify(filteredBooks));

    const successMessage = 'Book removed successfully';
    const ui = new UI();
    ui.showMessage(successMessage, true);
  }
  // prevent default click behavior
  e.preventDefault();
});
