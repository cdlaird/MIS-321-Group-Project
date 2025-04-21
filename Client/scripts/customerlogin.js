const url = ""; 

function showRegister() {
  console.log('made it to register')
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("registerForm").classList.add("active");
}

function showLogin() {
  document.getElementById("registerForm").classList.remove("active");
  document.getElementById("loginForm").classList.add("active");
}


const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phone = document.getElementById("phone").value;
  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;

  const customerData = {
    firstName,
    lastName,
    phone,
    username,
    password
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customerData)
    });

    if (!response.ok) throw new Error("User registration failed");

    alert("Account was created successfully!");
    showLogin();
    registerForm.reset();

  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  }
});

//method to take to customer.html