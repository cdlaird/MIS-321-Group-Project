document.addEventListener("DOMContentLoaded", async function () {
  const username = localStorage.getItem("customerUsername");

  if (!username) {
    alert("You are not logged in.");
    window.location.href = "customerlogin.html";
    return;
  }

  try {
    const response = await fetch(`http://localhost:5219/api/auth/customer/${username}`);
    if (!response.ok) throw new Error("Failed to load customer info");

    const customer = await response.json();

    document.getElementById("customerGreetingName").textContent = `${customer.custFirst} ${customer.custLast}`;
    document.getElementById("customerFullName").textContent = `${customer.custFirst} ${customer.custLast}`;
    document.getElementById("customerPhone").textContent = formatPhone(customer.phone);
    document.getElementById("customerPoints").textContent = customer.points;

    let tier = "Bronze";
    if (customer.points >= 100) tier = "Gold";
    else if (customer.points >= 50) tier = "Silver";

    document.getElementById("customerTier").textContent = tier;
    document.getElementById("customerTier").classList.add(`tier-${tier.toLowerCase()}`);
  } catch (err) {
    console.error("Error loading customer info:", err);
    alert("Could not load your info.");
    window.location.href = "customerlogin.html"; // fallback 
  }
});


function formatPhone(phone) {
  const cleaned = ('' + phone).replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}


function logout() {
  localStorage.removeItem("customerUsername");
  window.location.href = "customerlogin.html";
}