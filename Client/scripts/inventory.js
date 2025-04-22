
const url = "http://localhost:5219/api/Inventory";

//https://localhost:7283/api/Inventory
let books = [];
const container = document.getElementById("inventory-container");
const modal = new bootstrap.Modal(document.getElementById("inventoryModal"));

// Form references
const form = document.getElementById("inventoryForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const priceInput = document.getElementById("price");
const pageCountInput = document.getElementById("pageCount");
const genreInput = document.getElementById("genre");
const stockQuantityInput = document.getElementById("stockQuantity");
// const coverInput = document.getElementById("cover");
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
          <strong>Author:</strong> ${book.author}<br>
          <strong>ISBN:</strong> ${book.id}<br>
          <strong>Price:</strong> $${book.price}<br>
              <strong>Pages:</strong> ${book.genre}<br>
          <strong>Pages:</strong> ${book.pageCount}<br>
          <strong>Qty:</strong> ${book.stockQuantity}
        </p>
        <button class="btn btn-sm btn-warning me-2" onclick="editBook('${book.id}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteBook('${book.id}')">Delete</button>
      </div>
    `;

    container.appendChild(card);
  });
}

async function addBook(event) {
  event.preventDefault();
  console.log("form submitted")

  const newBook = {
    title: titleInput.value,
    author: authorInput.value,
    price: parseFloat(priceInput.value),
    genre: genreInput.value,
    pageCount: parseInt(pageCountInput.value),
    stockQuantity: parseInt(stockQuantityInput.value),
    // cover: coverInput.value,
  };

  try {

    console.log("sending book:", JSON.stringify(newBook));
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
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
  const response = await fetch(`${url} + "/" +${id}`);
  const book = await response.json();

  editIdInput.value = book.id;
  titleInput.value = book.title;
  authorInput.value = book.author;
  priceInput.value = book.price;
  genreInput.value = book.genre;
  pageCountInput.value = book.pageCount;
  quantityInput.value = book.stockQuantity;

  modal.show();
}
async function saveEditedBook(event) {
  event.preventDefault();

  const id = editIdInput.value;

  const updatedBook = {
    title: titleInput.value,
    author: authorInput.value,
    id: idInput.value,
    price: parseFloat(priceInput.value),
    genre: parseFloat(genreInput.value),
    pageCount: parseInt(pageCountInput.value),
    stockQuantity: parseInt(quantityInput.value),
    // cover: coverInput.value,
  };

  try {
    await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
  await fetch(`${url}/${id}`, { method: "DELETE" });
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
});