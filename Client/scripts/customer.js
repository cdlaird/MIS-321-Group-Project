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
  // document.getElementById("customerTier").value  = tierStatus(cust.points);
  } 
  customerModal.show();
};

async function addCustomer() {
  const newCustomer = {
    custFirst: document.getElementById("customerFirst").value.trim(),
    custLast:  document.getElementById("customerLast").value.trim(),
    phone:     document.getElementById("customerPhone").value.trim(),
    points:    parseInt(document.getElementById("customerPoints").value, 10),
    isDeleted: "n"
  };

  console.log("Submitting new customer:", newCustomer); // for debugging

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCustomer)
  });

  if (!response.ok) {
    const err = await response.text();
    alert("Failed to add customer:\n" + err);
    return;
  }

  const addedCustomer = await response.json();
  customers.push(addedCustomer);
  renderCustomers();
  customerModal.hide();
}



async function saveEditedCustomer(id) {
  const updated = {
    custID: id,
    custFirst: document.getElementById("customerFirst").value.trim(),
    custLast:  document.getElementById("customerLast").value.trim(),
    phone:     document.getElementById("customerPhone").value.trim(),
    points:    parseInt(document.getElementById("customerPoints").value, 10),
    isDeleted: "n"
    // isDeleted: "n"
    
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


  form.addEventListener("submit", async e => {
    e.preventDefault();
    const id = document.getElementById("customerId").value 
    if (id === "undefined") {
        await addCustomer()
        console.log('hello')
      } 
      else if(id != ""){
        await saveEditedCustomer(id);
      console.log('second code path')
      }
      
      customerModal.hide();
      await fetchCustomers()
      renderCustomers()   
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