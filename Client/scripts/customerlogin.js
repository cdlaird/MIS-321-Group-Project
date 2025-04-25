const registerUrl = "http://localhost:5219/api/auth/register";
const customerLoginUrl = "http://localhost:5219/api/auth/login";
const adminLoginUrl = "http://localhost:5219/api/auth/admin";

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

  const customerData = {
    custFirst: document.getElementById("firstName").value,
    custLast: document.getElementById("lastName").value,
    phone: document.getElementById("phone").value,
    username: document.getElementById("newUsername").value,
    password: document.getElementById("newPassword").value,
    points: 0,
    isDeleted: "n"
  };

  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) throw new Error("User registration failed");
    localStorage.setItem("customerName", `${customerData.custFirst} ${customerData.custLast}`);
    localStorage.setItem("customerPhone", customerData.phone);
    localStorage.setItem("customerPoints", customerData.points);
    localStorage.setItem("customerTier", "Bronze");
    localStorage.setItem("customerUsername", customerData.username);

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
    const response = await fetch(customerLoginUrl, {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(user)
    }
    )
    if (response.ok) {
      localStorage.setItem("customerUsername", user.username);
window.location.href = "customer.html";

    } else {
      alert('Invalid username or password.');
    }

  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred while logging in.');
  }
});
const adminLoginForm = document.getElementById("adminLoginForm");

if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const adminUser = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    };

    try {
      const response = await fetch(adminLoginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(adminUser)
      });

      if (response.ok) {
        window.location.href = "admin.html";
      } else {
        alert("Invalid admin login.");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      alert("Failed to login as admin.");
    }
  });
}