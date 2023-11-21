// import modules
import * as Events from './events.js';

let dialogUI = (function() {
  // cache dom
  const outerDialog = document.querySelector('dialog');
  const dialogForm = document.querySelector('form');
  const closeModal = document.querySelector('.close-modal');

  const dialogHeader = document.querySelector('.dialog-header');
  const submitButton = document.querySelector('.submit-todo');

  const titleInput = document.querySelector('#title');
  const descriptionInput = document.querySelector('#description');
  const dueInput = document.querySelector('#due-date');
  const priorityInput = document.querySelector('#priority');
  const notesInput = document.querySelector('#notes');

  // bind event listeners
  outerDialog.addEventListener('click', checkModalLocation);
  dialogForm.addEventListener('submit', submitDialog);
  closeModal.addEventListener('click', closeDialog);

  // methods
  function createDialog(item) {
    if (item) {
      dialogHeader.innerText = `To-Do: ${item.title}`;
      submitButton.innerText = 'Save';

      titleInput.value = item.title;
      descriptionInput.value = item.description;
      // add rest
    } else {
      // show the ADD modal options
      dialogHeader.innerText = 'Add New To-Do';
      submitButton.innerText = 'Add To-Do';
    }
    outerDialog.showModal();
  }

  function checkModalLocation(e) {
    const modalDimensions = outerDialog.getBoundingClientRect()
    if (
      e.clientX < modalDimensions.left ||
      e.clientX > modalDimensions.right ||
      e.clientY < modalDimensions.top ||
      e.clientY > modalDimensions.bottom
    ) {
      closeDialog();
    }
  }

  function submitDialog() {

  }

  function closeDialog() {
    titleInput.value = '';
    descriptionInput.value = '';
    dueInput.value = '';
    notesInput.value = '';
    priorityInput.value = 'Medium';

    outerDialog.close();
  }

  return { createDialog };
})();

// export
export { dialogUI };