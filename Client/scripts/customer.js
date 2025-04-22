//should we be updating the tier status in backend or in front end
const url = "http://localhost:5219/api/Customer";

let customers = [];

const customerModal = new bootstrap.Modal(
  document.getElementById("customerModal")
);
const form = document.getElementById("customerForm");

async function fetchCustomers() {
  let response = await fetch(url);
  customers = await response.json();
}

function renderCustomers() {
  const tbody = document.querySelector("#transactionsTable tbody");
  tbody.innerHTML = "";

  customers.forEach((cust) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${cust.custID}</td>
    <td>${cust.custFirst}  ${cust.custLast}</td>
    <td>${cust.phone}</td>
    <td>${cust.points}</td>
    <td>${cust.tier}</td>
    <td>
        <button class="btn btn-sm btn-primary" onclick="openCustomerModal(${cust.id})">Edit</button>
        </td>
    `;

    tbody.appendChild(row);
  });
}


function openCustomerModal(id = null) {
  document.getElementById("customerForm").reset();
  document.getElementById("customerId").value = id || "";

  if (id) {
    const customer = customers.find((c) => c.custID== id);
    if (customer) {
      document.getElementById("customerName").value = `${customer.custFirst} ${customer.custLast}`;
      document.getElementById("customerPhone").value = customer.phone;
      document.getElementById("customerPoints").value = customer.points;
      document.getElementById("customerTier").value = customer.tier;
    }
  }

  customerModal.show();
}

async function handleCustomerFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById("customerId").value;
  const name = document.getElementById("customerName").value.split(" ");
  const phone = document.getElementById("customerPhone").value;
  const points = parseInt(document.getElementById("customerPoints").value);
  const tier = document.getElementById("customerTier").value;
   
  const data = {
    custFirst: name[0],
    custLast: name[1] || "",
    phone,
    points,
    tier
  };

  if (id) {
    await fetch(url + "/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const index = customers.findIndex(c => c.custID == id);
    customers[index] = { ...data, custID: parseInt(id) };
  } else {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const newCustomer = await response.json();
    customers.push(newCustomer);
  }

  renderCustomers();
  customerModal.hide();
}

async function deleteCustomer(id) {
  await fetch(url + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  await fetchCustomers(); 
  renderCustomers();      
}

function searchTable() {
  const input = document.getElementById("myInput").value.toLowerCase();
  const rows = document.querySelectorAll("#transactionsTable tbody tr");

  rows.forEach((row) => {
    const name = row.cells[1].textContent.toLowerCase();
    const phone = row.cells[2].textContent.toLowerCase();
    row.style.display =
      name.includes(input) || phone.includes(input) ? "" : "none";
  });
}

// document.addEventListener("DOMContentLoaded", function () {
//   const badge = document.querySelector(".tier-badge");
//   if (badge.textContent === "Gold") {
//     badge.style.backgroundColor = "#FFD700";
//   }
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const badge = document.querySelector(".tier-badge");
//   if (badge.textContent === "Silver") {
//     badge.style.backgroundColor = "#C0C0C0";
//   }
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const badge = document.querySelector(".tier-badge");
//   if (badge.textContent === "Bronze") {
//     badge.style.backgroundColor = "#E5E4E2";
//   }
// });

function openNav() {
  document.body.classList.add("sidepanel-open");
  document.getElementById("mySidepanel").style.width = "250px";
  document.getElementById("mySidepanel").appendChild(openBtn);
}

function closeNav() {
  document.body.classList.remove("sidepanel-open");
  document.getElementById("mySidepanel").style.width = "0";
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchCustomers();
  renderCustomers();
});