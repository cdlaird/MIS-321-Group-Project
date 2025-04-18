document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = {
        username: username,
        password: password
    };


    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
  
      if (response.ok) {
        window.location.href = 'landing.html';
      } else {
        alert('Invalid username or password.');
      }

    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in.');
    }
  });
