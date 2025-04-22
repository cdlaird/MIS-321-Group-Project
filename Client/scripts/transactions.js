const url = "http://localhost:5219/api/Transaction"; 


// add a filter report for transactions

const addTransactionBtn = document.getElementById("addTransactionBtn");
const customerIdInput = document.getElementById("customerId");
const bookIdInput = document.getElementById("bookId");
const transactionDateInput = document.getElementById("transactionDate");


addTransactionBtn.addEventListener('click', async function() {
  console.log(customerIdInput.value)
  console.log(transactionDateInput.value)
  console.log(bookIdInput.value)
  const transaction = {
    custId: parseInt(customerIdInput.value),
    datetime: new Date(transactionDateInput.value),
    bookId: parseInt(bookIdInput.value)
  }; 


  // const bookIds = bookIdInput.value.split(",").map(id => ({
  //   bookId: parseInt(id.trim())
  // }));

    //should hopefully post once connected to backend
    
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    // const result = await response.json();
    
      
      
      const myModal = new bootstrap.Modal(document.getElementById('transactionModal'));
      myModal.hide();
      await renderTransactions();

      document.getElementById("add-transaction-form").reset();
      await renderTransactions();
 



  });
   
async function renderTransactions() {
  const response = await fetch(url);
  const transactions = await response.json();

  transactionsTableBody.innerHTML = "";

  transactions.forEach((t) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${t.transactionID}</td>
      <td>${t.custid}</td>
      <td>${new Date(t.datetime).toLocaleDateString()}</td>
      <td>View Bridge</td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteTransaction(${t.transactionID})">Delete</button></td>
    `;

    transactionsTableBody.appendChild(row);
  });
}



function searchTable(){
    const input = document.getElementById("myInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("transactionsTable");
    const tr = table.getElementsByTagName("tr");

    for(let i = 0; i < tr.length; i++){
        const td = tr[i].getElementsByTagName("td")[0];
        if(td){
            txtValue = td.textContent || td.innerText;
            if(txtValue.toUpperCase().indexOf(filter)> -1){
                tr[i].style.display = "";
            }
            else{
                tr[i].style.display = "none";
            }
        } 
    }

}

  function openNav() {
    document.body.classList.add('sidepanel-open');
    document.getElementById("mySidepanel").style.width = "250px";
    document.getElementById("mySidepanel").appendChild(openBtn);
  }

  function closeNav() {
    document.body.classList.remove('sidepanel-open')
    document.getElementById("mySidepanel").style.width = "0";
  }


