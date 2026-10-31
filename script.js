'use strict';
const myLibrary = [];

function Book(name, author, pages, read) {
    if(!new.target) {
        throw Error('Use New Operator')
    }
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

// take params, create a book then store it in the array
function addBookToLibrary(name, author, pages, read) {
    const newBook = new Book(name, author, pages, read);
    myLibrary.push(newBook);
}

function displayBook() {
    
}

// render every book in the library as a card
function displayBooks() {
    const container = document.querySelector('.library');
    container.textContent = '';

    for (const book of myLibrary) {
        const card = document.createElement('article');
        card.className = 'book';
        card.dataset.id = book.id;

        const removeBtn = document.createElement('button')
        removeBtn.className = 'remove-button';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            const index = myLibrary.findIndex((b) => b.id === book.id);
            myLibrary.splice(index, 1);
            displayBooks();
        });

        const title = document.createElement('h2');
        title.className = 'book-title';
        title.textContent = book.name;

        const author = document.createElement('p');
        author.className = 'book-author';
        author.textContent = `by ${book.author}`;

        const pages = document.createElement('p');
        pages.className = 'book-pages';
        pages.textContent = `${book.pages} pages`;

        const read = document.createElement('p');
        read.className = 'book-read';
        read.textContent = book.read ? 'Read' : 'Not read';

        const toggleReadBtn = document.createElement('button')
        toggleReadBtn.className = 'toggle-read-button';
        toggleReadBtn.textContent = 'Change read status';
        toggleReadBtn.addEventListener('click', () => {
            book.read = !book.read;
            displayBooks();
        });

        card.append(title, author, pages, read,toggleReadBtn , removeBtn);
        container.append(card);
    }
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
displayBooks();

  const dialog = document.getElementById('bookDialog');
  const form = document.getElementById('bookForm');

    document.getElementById('add-book').addEventListener('click', () => {
        dialog.showModal();
    });

  document.getElementById('cancelBtn').addEventListener('click', () => {
    form.reset();
    dialog.close();
  });

    document.getElementById('cancelBtn').addEventListener('click', () => {
    form.reset();
    dialog.close();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bookName = form.elements.title.value;
    const author = form.elements.author.value;
    const pages = form.elements.pages.value;
    const read = form.elements.read.checked;
    addBookToLibrary(bookName,author,pages,read);
    displayBooks();
    form.reset();
    dialog.close();
  });
