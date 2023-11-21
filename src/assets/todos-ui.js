// import modules
import * as Events from './events.js';

let TodosUI = (function() {
  // cache dom
  const contentContainer = document.querySelector('.content');

  const projName = document.querySelector('.project-name');
  const projDescription = document.querySelector('.project-description');

  const todoList = document.querySelector('.todo-items');
  const addTodo = document.querySelector('.add-todo');

  // bind event listeners
  addTodo.addEventListener('click', checkDialogMode);
  todoList.addEventListener('click', todoAction);
  projName.addEventListener('input', changeProjName);
  projDescription.addEventListener('input', changeProjDesc);

  // methods
  function renderContent(project) {
    if (!project) {
      contentContainer.style.visibility = 'hidden';
    } else {
      contentContainer.style.visibility = 'visible';
      renderMeta(project);
      renderItems(project);
    }
  }

  function renderMeta(project) {
    projName.value = project.title ? project.title : '';
    projDescription.value = project.description ? project.description : '';
  }

  function renderItems(project) {
    removeElements(todoList);
    for (let item of project.items) {
      const index = project.items.indexOf(item);
      todoList.appendChild(createItem(item, index));
    }
  }

  function removeElements(parent) {
    let childElements = Array.from(parent.children)
    for (let child of childElements) {
      parent.removeChild(child);
    }
  }

  function createItem(item, index) {
    const newItem = document.createElement('div');
    newItem.classList.add('todo');
    newItem.setAttribute('data-index', index);

    let checkedStatus = '';
    if (item.completed) {
      newItem.classList.add('completed');
      checkedStatus = 'checked';
    }

    let priorityValue = item.priority.toLowerCase();

    newItem.innerHTML = 
    `
    <input type="checkbox" class="checkbox" ${checkedStatus}>
    <h3>${item.title}</h3>
    <p class="todo-description">${item.description}</p>
    <p>${item.dueDate}</p>
    <div class="priority ${priorityValue}">${item.priority}</div>
    <div class="delete-todo"></div>
    `
    ;

    return newItem;
  }

  function todoAction(e) {
    if (e.target.closest('.delete-todo')) {
      deleteItem(e.target.closest('div[data-index]').getAttribute('data-index'));
    } else if (e.target.closest('.checkbox')) {
      toggleItemStatus(e.target.closest('div[data-index]').getAttribute('data-index'));
    } else if (e.target.closest('.todo')) {
      checkDialogMode(e.target.closest('div[data-index]').getAttribute('data-index'));
    }
  }

  function deleteItem(index) {
    Events.emit('deleteItem', index);
  }

  function toggleItemStatus(index) {
    Events.emit('toggleItemStatus', index);
  }

  function checkDialogMode(e) {
    let index = typeof(e) === 'string' ? e : undefined;
    Events.emit('openModal', index);
  }

  function changeProjName() {
    let string = projName.value;
    Events.emit('changeProjName', string);
  }

  function changeProjDesc() {
    let string = projDescription.value;
    Events.emit('changeProjDesc', string);
  }

  return { renderContent };
})();

// export
export { TodosUI };