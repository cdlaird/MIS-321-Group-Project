//should we be updating the tier status in backend or in front end
const url = "http://localhost:5219/api/Customer";

let customers = [];

const customerModal = new bootstrap.Modal(
  document.getElementById("customerModal")
);
const form = document.getElementById("customerForm");
const tbody = document.getElementById("customersTableBody");

async function fetchCustomers() {
  let response = await fetch(url);
  customers = await response.json();
}

function renderCustomers() {
  tbody.innerHTML = "";

  customers.forEach((cust) => {
    const row = document.createElement("tr");
    let tier = tierStatus(cust.points);
    row.innerHTML = `
    <td>${cust.custID}</td>
    <td>${cust.custFirst}  ${cust.custLast}</td>
    <td>${cust.phone}</td>
    <td>${cust.points}</td>
    <td>${tierStatus(cust.points)}</td>
    <td>
        <button class="btn btn-sm btn-primary" 
                onclick="openCustomerModal(${cust.custID})">
                Edit
                        </button>
        </td>
    `;

    tbody.appendChild(row);
  });
}
window.openCustomerModal = function(id) {
  form.reset();
  document.getElementById("customerId").value    = id;
  
  const cust = customers.find(c => c.custID === id);
  if (cust){
  document.getElementById("customerFirst").value =cust.custFirst;
  document.getElementById("customerLast").value =cust.custLast;
  document.getElementById("customerPhone").value = cust.phone;
  document.getElementById("customerPoints").value = cust.points;
  document.getElementById("customerTier").value  = tierStatus(cust.points);
  }
  customerModal.show();
};

async function saveEditedCustomer(id) {
  const updated = {
    custID: id,
    custFirst: document.getElementById("customerFirst").value.trim(),
    custLast:  document.getElementById("customerLast").value.trim(),
    phone:     document.getElementById("customerPhone").value.trim(),
    points:    parseInt(document.getElementById("customerPoints").value, 10),
    isDeleted: "n"
    
  };

  const response = await fetch(`${url}/${id}`, {
    method:  "PUT",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(updated)
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Failed to save:", response.status, text);
    alert("Failed to save changes");
    return null;
  }
  return updated;
}

  // update local array & re-render
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const id = parseInt(document.getElementById("customerId").value,10);
    if (isNaN(id)) return;
  
    const payload = await saveEditedCustomer(id);
    if (!payload) return;
  
    // update local array & re-render
    const idx = customers.findIndex(c => c.custID === id);
    customers[idx] = { custID: id, ...payload };
    renderCustomers();
  
    customerModal.hide();
  });

function tierStatus(points){
  if(points > 999){
    return "Platinum"
  }
  else if(points > 499){
    return "Gold"
  }
  else if(points > 99){
    return "Silver"
  }
  else{
    return "Bronze"
  }
}




  // async function handleCustomerFormSubmit(e) {
  //   e.preventDefault();

  //   const id = document.getElementById("customerId").value;
  //   const name = document.getElementById("customerName").value.split(" ");
  //   const phone = document.getElementById("customerPhone").value;
  //   const points = parseInt(document.getElementById("customerPoints").value);
  //   const tier = tierStatus(points);
    
  //   const data = {
  //     custFirst: name[0],
  //     custLast: name[1] || "",
  //     phone,
  //     points,
  //     tier
  //   };

  //   if (id) {
  //     await fetch(url + "/" + id, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data)
  //     });

  //     const index = customers.findIndex(c => c.custID == id);
  //     customers[index] = { ...data, custID: parseInt(id) };
  //   } else {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data)
  //     });

  //     const newCustomer = await response.json();
  //     customers.push(newCustomer);
  //   }

  //   renderCustomers();
  //   customerModal.hide();
  // }

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