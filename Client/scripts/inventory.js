const url = "http://localhost:5219/api/Inventory";

let books = [];
const container = document.getElementById("inventory-container");
const modal = new bootstrap.Modal(document.getElementById("inventoryModal"));


const form = document.getElementById("inventoryForm");
form.addEventListener("submit", onFormSubmit);
renderBooks();

async function onFormSubmit(event){
  event.preventDefault();
  const id = document.getElementById("editBookId").value;
  if(id){
    await saveEditedBook(id);
  }
  else{
    await handleAdd();

  }
  modal.hide();
  form.reset();
  await renderBooks();
}

async function handleAdd(){
  console.log("handleAdd function called!");
const isbnInput = document.getElementById("isbn");
const titleInput = document.getElementById("title");
const authorFirstInput = document.getElementById("authorFirst");
const authorLastInput = document.getElementById("authorLast");
const priceInput = document.getElementById("price");
const pageCountInput = document.getElementById("pageCount");
const genreInput = document.getElementById("genre");
const stockQuantityInput = document.getElementById("inStock");
// const editIdInput = document.getElementById("editBookId");

console.log("Form values:", {
  isbn: isbnInput.value,
  title: titleInput.value,
  authorFirst: authorFirstInput.value,
  authorLast: authorLastInput.value,
  pageCount: pageCountInput.value,
  genre: genreInput.value,
  inStock: stockQuantityInput.value
});
console.log(titleInput.value)
const book = {
  isbn :isbnInput.value,
  title: titleInput.value,
  authorFirst: authorFirstInput.value,
  authorLast: authorLastInput.value,
  price: parseInt(priceInput.value),
  pageCount: parseInt(pageCountInput.value),
  genre: genreInput.value,
  inStock: stockQuantityInput.value,
  isDeleted: 'n'
};

console.log("Sending data to server:", book);
console.log("Endpoint URL:", url);

try {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(book),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  
  console.log("Post response", response);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Server error: ${response.status} - ${errorText}`);
    alert(`Failed to add book: ${response.status} error`);
    return;
  }
  
  modal.hide();
  form.reset();
  await renderBooks();
} catch (error) {
  console.error("Error adding book:", error);
  alert("Failed to add book: " + error.message);
}}

async function editBook(id){
  const response=await fetch(`${url}/${id}`);
  if(!response.ok){
    console.error("Fetch book failed:", response.status);
    alert("Could not load book for editing");
    return;
  }
  const book =await response.json();
   
   document.getElementById("editBookId").value     = book.bookId;
   document.getElementById("isbn").value           = book.isbn;
   document.getElementById("title").value          = book.title;
   document.getElementById("authorFirst").value    = book.authorFirst;
   document.getElementById("authorLast").value     = book.authorLast;
   document.getElementById("genre").value          = book.genre;
   document.getElementById("pageCount").value      = book.pageCount;
   document.getElementById("price").value=book.price;
   document.getElementById("inStock").value        = book.inStock;
 
   
   modal.show();
}
async function saveEditedBook(id) {
  const updated = {
    isbn        : document.getElementById("isbn").value.trim(),
    title       : document.getElementById("title").value.trim(),
    authorFirst : document.getElementById("authorFirst").value.trim(),
    authorLast  : document.getElementById("authorLast").value.trim(),
    genre       : document.getElementById("genre").value.trim(),
    pageCount   : parseInt(document.getElementById("pageCount").value, 10),
    price: parseFloat(document.getElementById("price").value),
    inStock     : document.getElementById("inStock").value.trim(),
    isDeleted   : "n"
  };
  const resp = await fetch(`${url}/${id}`, {
    method:  "PUT",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(updated)
  });
  if (!resp.ok) {
    const txt = await resp.text();
    console.error("Update failed:", resp.status, txt);
    alert("Failed to save changes");
  }
}


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


