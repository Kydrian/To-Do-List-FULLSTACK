console.log("it works");
const delButtonHandler = async (event) => {
  console.log(event.target)
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/api/tasks');
      } else {
        alert('Failed to delete task');
      }
    }
  };
  
  document
    .querySelector('#tasksList')
    .addEventListener('click', delButtonHandler);
    console.log("hi");
 
  
  