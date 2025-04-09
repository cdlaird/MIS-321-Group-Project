let myInventory = [];
const url = "your-api-url"; // API URL will go here

async function handleOnLoad() {
  await getAllInventory();
  renderTable();
}

async function getAllInventory() {
  let response = await fetch(url);
  myInventory = await response.json();
  console.log(myInventory);
}

function renderTable() {
  let html = `
    <table class="table">
        <thead>
            <tr>
                <th>Cover</th>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Page Count</th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>`;

  myInventory.forEach((book) => {
    if (!book.isDeleted) {
      html += `<tr>
                <td><img src="${book.coverUrl}" alt="Book Cover" style="width: 50px; height: 75px;"></td>
                <td>${book.isbn}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>$${parseFloat(book.price).toFixed(2)}</td>
                <td>${book.pageCount}</td>
                <td>${book.quantity}</td>
                <td><button class="btn btn-danger" onclick="handleDelete('${book.isbn}')">Delete</button></td>
               </tr>`;
    }
  });

  html += `</tbody></table>`;
  document.getElementById("inventory-table").innerHTML = html;
}

async function handleDelete(isbn) {
  await fetch(url + "/" + isbn, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  handleOnLoad();
}

function showForm() {
  // should show the form when Add Item button is clicked
  document.getElementById("add-book-form").style.display = "block";
}

function hideForm() {
  // Hide the form when cancel button is clicked
  document.getElementById("add-book-form").style.display = "none";
}

async function handleAdd() {
  let newBook = {
    cover: document.getElementById("cover").files[0], 
    isbn: document.getElementById("isbn").value,
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    price: document.getElementById("price").value,
    pageCount: document.getElementById("page-count").value,
    quantity: document.getElementById("quantity").value,
  };


  newBook.coverUrl = URL.createObjectURL(newBook.cover);


  await fetch(url, {
    method: "POST",
    body: JSON.stringify(newBook),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  // Hide the form again after adding the book
  hideForm();

  
  handleOnLoad();
}