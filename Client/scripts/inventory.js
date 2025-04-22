const url = "http://localhost:5219/api/Inventory";

let books = [];
const container = document.getElementById("inventory-container");
const modal = new bootstrap.Modal(document.getElementById("inventoryModal"));

const form = document.getElementById("inventoryForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const priceInput = document.getElementById("price");
const pageCountInput = document.getElementById("pageCount");
const genreInput = document.getElementById("genre");
const stockQuantityInput = document.getElementById("stockQuantity");
const editIdInput = document.getElementById("editBookId");

async function renderBooks() {
  const response = await fetch(url);
  books = await response.json();
  container.innerHTML = "";

  books.forEach((book) => {
    const card = document.createElement("div");
    card.className = "card book-card";
    card.style.width = "200px";

    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">
          <strong>Author:</strong> ${book.authorFirst} ${book.authorLast}<br>
          <strong>ISBN:</strong> ${book.isbn}<br>
          <strong>Pages:</strong> ${book.pageCount}<br>
          <strong>Qty:</strong> ${book.inStock}<br>
        </p>
        <button class="btn btn-sm btn-warning me-2" onclick="editBook(${book.bookId})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.bookId})">Delete</button>
      </div>
    `;

    container.appendChild(card);
  });
}

async function addBook(event) {
  event.preventDefault();

  const newBook = {
    ISBN: "",
    title: titleInput.value,
    authorFirst: authorInput.value.split(" ")[0],
    authorLast: authorInput.value.split(" ")[1],
    genre: genreInput.value,
    pageCount: parseInt(pageCountInput.value),
    inStock: stockQuantityInput.value,
    isDeleted: "n",
  };

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(newBook),
    });

    form.reset();
    modal.hide();
    await renderBooks();
  } catch (error) {
    console.error("Error adding book:", error);
  }
}

async function editBook(id) {
  const response = await fetch(url + "/" + id);
  const book = await response.json();

  editIdInput.value = book.bookId;
  titleInput.value = book.title;
  authorInput.value = `${book.authorFirst} ${book.authorLast}`;
  genreInput.value = book.genre;
  pageCountInput.value = book.pageCount;
  stockQuantityInput.value = book.inStock;

  modal.show();
}

async function saveEditedBook(event) {
  event.preventDefault();

  const id = editIdInput.value;

  const updatedBook = {
    ISBN: "",
    title: titleInput.value,
    authorFirst: authorInput.value.split(" ")[0],
    authorLast: authorInput.value.split(" ")[1],
    genre: genreInput.value,
    pageCount: parseInt(pageCountInput.value),
    inStock: stockQuantityInput.value,
    isDeleted: "n",
  };

  try {
    await fetch(url + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;  charset=UTF-8",
      },
      body: JSON.stringify(updatedBook),
    });

    form.reset();
    modal.hide();
    await renderBooks();
  } catch (error) {
    console.error("Error saving book:", error);
  }
}

async function deleteBook(id) {
  await fetch(url + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;  charset=UTF-8",
    },
  });

  await renderBooks();
}

function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
  document.body.classList.add("sidepanel-open");
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
  document.body.classList.remove("sidepanel-open");
}

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", addBook);
  renderBooks();
});
