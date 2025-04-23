const url = "http://localhost:5219/api/Transaction";
const modal = new bootstrap.Modal(document.getElementById("transactionModal"));

async function handleAdd() {
  const customerIdInput = document.getElementById("customerId");
  const bookIdInput = document.getElementById("bookId");
  const transactionDateInput = document.getElementById("transactionDate");
  console.log(customerIdInput.value);
  console.log(transactionDateInput.value);
  console.log(bookIdInput.value);
  const transaction = {
    custId: parseInt(customerIdInput.value),
    datetime: new Date(transactionDateInput.value),
    bookId: parseInt(bookIdInput.value),
  };

  //should hopefully post once connected to backend

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log("Post respone", response);

  const myModal = new bootstrap.Modal(
    document.getElementById("transactionModal")
  );
  await renderTransactions();
  
  document.getElementById("add-transaction-form").reset();
  modal.hide();
}

async function handleDelete(transactionID) {
  await fetch(url + "/" + transactionID, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;  charset=UTF-8",
    },
  });

  await renderTransactions();
}

async function renderTransactions() {
  const response = await fetch(url);
  const transactions = await response.json();

  const transactionsTableBody = document.getElementById(
    "transactionsTableBody"
  );
  transactionsTableBody.innerHTML = "";

  transactions.forEach((t) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${t.transactionID}</td>
      <td>${t.custId}</td>
       <td>${t.bookId}</td>
      <td>${new Date(t.datetime).toLocaleDateString()}</td>
      <td><button class="btn btn-sm btn-danger" onclick="handleDelete(${
        t.transactionID
      })">Delete</button></td>
    `;

    transactionsTableBody.appendChild(row);
  });
}

function searchTable() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("transactionsTable");
  const tr = table.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function openNav() {
  document.body.classList.add("sidepanel-open");
  document.getElementById("mySidepanel").style.width = "250px";
  document.getElementById("mySidepanel").appendChild(openBtn);
}

function closeNav() {
  document.body.classList.remove("sidepanel-open");
  document.getElementById("mySidepanel").style.width = "0";
}



 // addTransactionBtn.addEventListener('click', async function() {
  //   console.log("Add button clicked");

  //   console.log(customerIdInput.value)
  //   console.log(transactionDateInput.value)
  //   console.log(bookIdInput.value)
  //   const transaction = {
  //     custId: parseInt(customerIdInput.value),
  //     datetime: new Date(transactionDateInput.value),
  //     bookId: parseInt(bookIdInput.value)

  //   };