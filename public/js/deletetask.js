document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
      const taskId = event.target.getAttribute('data-id');
      const completed = event.target.checked;

      fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
      }).then(response => {
        if (response.ok) {
          location.reload();
        } else {
          alert('Failed to update task');
        }
      });
    });
  });

  document.querySelectorAll('button[data-id]').forEach(button => {
    button.addEventListener('click', (event) => {
      const taskId = event.target.getAttribute('data-id');

      fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
      }).then(response => {
        if (response.ok) {
          location.reload();
        } else {
          alert('Failed to delete task');
        }
      });
    });
  });
});
