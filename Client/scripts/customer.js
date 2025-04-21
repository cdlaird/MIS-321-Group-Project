//should we be updating the tier status in backend or in front end
const url = '';


let customers = [];

const customerModal = new bootstrap.Modal(document.getElementById('customerModal'));
const form = document.getElementById("customerForm");




function renderCustomers(){
  const tbody = document.querySelector("#transactionsTable tbody");
  tbody.innerHTML = "";

  customers.forEach( cust => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${cust.id}</td>
    <td>${cust.name}</td>
    <td>${cust.phone}</td>
    <td>${cust.points}</td>
    <td>${cust.tier}</td>
    <td>
        <button class="btn btn-sm btn-primary" onclick="openCustomerModal(${cust.id})">Edit</button>
        </td>
    `;

    tbody.appendChild(row);
  })
}

function openCustomerModal(id = null) {
  document.getElementById("customerForm").reset();
  document.getElementById("customerId").value = id || "";

  if (id) {
      const customer = customers.find(c => c.id == id);
      if (customer) {
          document.getElementById("customerName").value = customer.name;
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
  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const points = parseInt(document.getElementById("customerPoints").value);
  const tier = document.getElementById("customerTier").value;

  try {
      if (id) { const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, name, phone, points, tier })
    });

    if (!response.ok) throw new Error("Failed to update customer");

    const updatedCustomer = await response.json();
    const index = customers.findIndex(c => c.id == id);
    if (index !== -1) customers[index] = updatedCustomer;

} 
else {const response = await fetch(url, {
  method: "POST",
  headers: {
      "Content-Type": "application/json"
  },
  body: JSON.stringify({ name, phone, points, tier })
});

if (!response.ok) throw new Error("Failed to create customer");

const newCustomer = await response.json();
customers.push(newCustomer);
}
renderCustomers();
customerModal.hide();

} catch (error) {
console.error("Customer form error:", error);
alert("Something went wrong. Please try again.");
}
}


function searchTable() {
  const input = document.getElementById("myInput").value.toLowerCase();
  const rows = document.querySelectorAll("#transactionsTable tbody tr");

  rows.forEach(row => {
      const name = row.cells[1].textContent.toLowerCase();
      const phone = row.cells[2].textContent.toLowerCase();
      row.style.display = name.includes(input) || phone.includes(input) ? "" : "none";
  });
}




document.addEventListener("DOMContentLoaded", function () {
    const badge = document.querySelector(".tier-badge");
    if (badge.textContent.trim() === "Gold") {
      badge.style.backgroundColor = "#FFD700"; 
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const badge = document.querySelector(".tier-badge");
    if (badge.textContent.trim() === "Silver") {
      badge.style.backgroundColor = "#C0C0C0"; 
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const badge = document.querySelector(".tier-badge");
    if (badge.textContent.trim() === "Platinum") {
      badge.style.backgroundColor = "#E5E4E2"; 
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const badge = document.querySelector(".tier-badge");
    if (badge.textContent.trim() === "Bronze") {
      badge.style.backgroundColor = "#E5E4E2"; 
    }
  });


  function openNav() {
    document.body.classList.add('sidepanel-open');
    document.getElementById("mySidepanel").style.width = "250px";
    document.getElementById("mySidepanel").appendChild(openBtn);
  }

  function closeNav() {
    document.body.classList.remove('sidepanel-open')
    document.getElementById("mySidepanel").style.width = "0";
  }
