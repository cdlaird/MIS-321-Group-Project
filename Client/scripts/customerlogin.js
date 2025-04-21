const url = "";

function showRegister() {
  console.log("made it to register");
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

  firstName = document.getElementById("firstName").value;
  lastName = document.getElementById("lastName").value;
  phone = document.getElementById("phone").value;
  username = document.getElementById("newUsername").value;
  password = document.getElementById("newPassword").value;
  points: 0;
  tier: "Bronze";

  const customerData = {
    firstName,
    lastName,
    phone,
    username,
    password,
    points,
    tier,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
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

document.getElementById("loginForm").addEventListener("submit", async function (e){
  e.preventDefault();
  const user = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  };

  if(!user.username || !user.password){
    alert("Enter username and password")
    return;
  }
  try{
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(user)
    }
    )
    if (response.ok) {
      window.location.href = 'customer.html';
    } else {
      alert('Invalid username or password.');
    }

  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred while logging in.');
  }
});
