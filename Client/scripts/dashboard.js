document.addEventListener("DOMContentLoaded", async () => {
  await loadSales();
  await loadTopAuthors();
  await loadTopBooks();
});

async function loadSales() {
  const ranges = ["daily", "weekly", "monthly"];
  for (let range of ranges) {
    const response = await fetch(`http://localhost:5219/api/stats/sales/${range}`);
    const amount = await response.json();
    document.getElementById(`${range}Sales`).textContent = `$${amount.toFixed(2)}`;
  }
}

async function loadTopAuthors() {
  try {
    const res = await fetch("http://localhost:5219/api/stats/top-authors");
    if (!res.ok) throw new Error(`Top authors fetch failed: ${res.status}`);
    
    const authors = await res.json();
    const tbody = document.getElementById("authorsTableBody");
    tbody.innerHTML = "";

    authors.forEach(({ author, count }) => {
      const row = `<tr><td>${author}</td><td>${count}</td></tr>`;
      tbody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error loading top authors:", error);
  }
}

async function loadTopBooks() {
  try {
    const res = await fetch("http://localhost:5219/api/stats/top-books");
    if (!res.ok) throw new Error(`Top books fetch failed: ${res.status}`);

    const books = await res.json();
    const tbody = document.getElementById("booksTableBody");
    tbody.innerHTML = "";

    books.forEach(({ title, count }) => {
      const row = `<tr><td>${title}</td><td>${count}</td></tr>`;
      tbody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error loading top books:", error);
  }
}



function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
    document.body.classList.add("sidepanel-open");
  }
  
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
    document.body.classList.remove("sidepanel-open");
  }
