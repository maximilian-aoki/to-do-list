// import modules
import { Todo } from './todos.js';

// Project 'class'
const Project = function() {
  // AUTO PROPERTIES
  let title;
  let description;
  let dateCreated = _getDate();

  // ITERABLE - lists all to-dos for the project instance
  let items = [];

  function _getDate() {
    return new Date();
  }

  function edit(editObj) {
    this.title = editObj.title;
    this.description = editObj.description;
  }

  function addItem(newObj) {
    this.items.push(Todo(newObj));
  }

  function removeItem(index) {
    this.items.splice(index, 1);
  }

  function sort(property, descending = true) {
    if (descending) {
      this.items = this.items.sort((a, b) => (a[property] > b[property]) ? -1 : 1);
    } else {
      this.items = this.items.sort((a, b) => (a[property] > b[property]) ? 1 : -1);
    }
  }

  return {
    // properties
    title,
    description,
    dateCreated,

    // iterable property
    items,

    // public methods
    edit,
    addItem,
    removeItem,
    sort
  }
};

export { Project };