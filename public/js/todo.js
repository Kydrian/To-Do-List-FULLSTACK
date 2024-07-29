document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const todoList = document.getElementById('todo-list');
    const inProgressList = document.getElementById('inprogress-list');
    const doneList = document.getElementById('done-list');
  
    // Function to add task to the appropriate list
    function addTaskToDOM(task) {
      const taskItem = document.createElement('li');
      taskItem.className = 'list-group-item d-flex justify-content-between align-items-center card';
      taskItem.innerHTML = `
        ${task.task}
        <div>
          <input type="checkbox" class="mr-2" ${task.completed ? 'checked' : ''} data-id="${task.id}">
          <button class="btn btn-danger btn-sm" data-id="${task.id}">Delete</button>
        </div>
      `;
  
      if (task.completed) {
        doneList.appendChild(taskItem);
      } else if (task.inProgress) {
        inProgressList.appendChild(taskItem);
      } else {
        todoList.appendChild(taskItem);
      }
  
      // Add event listeners for checkbox and delete button
      taskItem.querySelector('input[type="checkbox"]').addEventListener('change', handleTaskStatusChange);
      taskItem.querySelector('button[data-id]').addEventListener('click', handleTaskDelete);
    }
  
    // Handle form submission
    taskForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const taskInput = document.getElementById('task');
      const task = taskInput.value.trim();
  
      if (task) {
        fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ task })
        })
        .then(response => response.json())
        .then(data => {
          addTaskToDOM(data);
          taskInput.value = '';
        })
        .catch(error => {
          console.error('Error adding task:', error);
        });
      }
    });
  
    // Handle task status change
    function handleTaskStatusChange(event) {
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
    }
  
    // Handle task deletion
    function handleTaskDelete(event) {
      const taskId = event.target.getAttribute('data-id');
  
      fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
      }).then(response => {
        if (response.ok) {
          event.target.closest('li').remove();
        } else {
          alert('Failed to delete task');
        }
      });
    }
  
    // Initial loading of tasks
    fetch('/api/tasks')
      .then(response => response.json())
      .then(tasks => {
        tasks.forEach(task => addTaskToDOM(task));
      })
      .catch(error => {
        console.error('Error loading tasks:', error);
      });
  
    // Make lists sortable using Sortable.js
    const sortableLists = document.querySelectorAll('.sortable');
    sortableLists.forEach(list => {
      new Sortable(list, {
        group: 'kanban',
        animation: 150,
        onEnd: function (/**Event*/evt) {
          const taskId = evt.item.querySelector('input[type="checkbox"]').getAttribute('data-id');
          const newListId = evt.to.id;
  
          let inProgress = false;
          let completed = false;
  
          if (newListId === 'inprogress-list') {
            inProgress = true;
          } else if (newListId === 'done-list') {
            completed = true;
          }
  
          fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inProgress, completed })
          }).then(response => {
            if (!response.ok) {
              alert('Failed to update task');
            }
          });
        }
      });
    });
  });
  