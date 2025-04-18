let books = [];
const url = "https://localhost:7283/api/inventory";
const container = document.getElementById("inventory-container");
const modal = new bootstrap.Modal(document.getElementById("inventoryModal"));

// Form references
const form = document.getElementById("inventoryForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const isbnInput = document.getElementById("isbn");
const priceInput = document.getElementById("price");
const pageCountInput = document.getElementById("pageCount");
const quantityInput = document.getElementById("quantity");
const coverInput = document.getElementById("cover");
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
      <img src="${book.cover}" class="card-img-top" alt="${book.title} cover">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">
          <strong>Author:</strong> ${book.author}<br>
          <strong>ISBN:</strong> ${book.isbn}<br>
          <strong>Price:</strong> $${book.price}<br>
          <strong>Pages:</strong> ${book.pageCount}<br>
          <strong>Qty:</strong> ${book.quantity}
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

  const newBook = {
    title: titleInput.value,
    author: authorInput.value,
    isbn: isbnInput.value,
    price: parseFloat(priceInput.value).toFixed(2),
    pageCount: parseInt(pageCountInput.value),
    quantity: parseInt(quantityInput.value),
    cover: coverInput.value,
  };

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
  isbnInput.value = book.isbn;
  priceInput.value = book.price;
  pageCountInput.value = book.pageCount;
  quantityInput.value = book.quantity;
  coverInput.value = book.cover;

  modal.show();
}
async function saveEditedBook(event) {
  event.preventDefault();

  const id = editIdInput.value;

  const updatedBook = {
    title: titleInput.value,
    author: authorInput.value,
    isbn: isbnInput.value,
    price: parseFloat(priceInput.value).toFixed(2),
    pageCount: parseInt(pageCountInput.value),
    quantity: parseInt(quantityInput.value),
    cover: coverInput.value,
  };

  try {
    await fetch(`${url}/${updatedBook.id}`, {
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
