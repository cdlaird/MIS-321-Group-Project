
function openModal() {
    document.getElementById('loginModal').style.display = 'block';
}


function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const createForm = document.getElementById('createForm');
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    createForm.style.display = createForm.style.display === 'none' ? 'block' : 'none';
}


document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    const response = await fetch('/api/customerlogin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  
    const result = await response.json();
    if (result.success) {
      window.location.href = 'landing.html';
    } else {
      alert('Invalid username or password');
    }
});

document.getElementById('createForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value.trim();
  
    const response = await fetch('/api/customerregister', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, username, password })
    });
  
    const result = await response.json();
    if (result.success) {
      alert('Account created! You can now log in.');
      toggleForms(); 
    } else {
      alert(result.message || 'Could not create account.');
    }
});