
const url = "apiurlgoeshere"; 


// add a filter report for transactions

const addTransactionBtn = document.getElementById("addTransactionBtn");
const customerIdInput = document.getElementById("customerId");
const nameInput = document.getElementById("name");
const bookIdInput = document.getElementById("bookId");
const transactionDateInput = document.getElementById("transactionDate");


addTransactionBtn.addEventListener('click', async function() {

  const newTransaction = {
    customerId: customerIdInput.value,
    name: nameInput.value,
    bookId: bookIdInput.value,
    transactionDate: transactionDateInput.value,
  };

  try {
    //should hopefully post once connected to backend
    
    const response = await fetch(url + "/add-transaction", {
      method: "POST",
      body: JSON.stringify(newTransaction),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const result = await response.json();
    
    if (result.success) {
      alert("Transaction was added successfully!");
      
      
      const myModal = new bootstrap.Modal(document.getElementById('transactionModal'));
      myModal.hide();

      document.getElementById("add-transaction-form").reset();
    } else {
      alert("Error adding transaction.");
    }

    //need this to say error
  } catch (error) {
    alert("There was an error adding transaction. Please try again!");
  }
});

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
    document.getElementById("mySidepanel").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }


