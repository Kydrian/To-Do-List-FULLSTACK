document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');
  
    const loginFormHandler = async (event) => {
      event.preventDefault();
  
      const username = document.querySelector('#username').value.trim();
      const password = document.querySelector('#password').value.trim();
  
      if (username && password) {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/tasks'); // Redirect to the tasks screen
        } else {
          alert('Failed to log in.');
        }
      }
    };
  
    loginForm.addEventListener('submit', loginFormHandler);
  });
  