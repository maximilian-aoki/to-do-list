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

  // STATE
  let currentItem = undefined;

  function _getDate() {
    return new Date();
  }

  return {
    // properties
    title,
    description,
    dateCreated,

    // iterable property
    items,
    currentItem,
  }
};

function addItemPROJ(project, newObj) {
  project.items.push(Todo(newObj));
}

function removeItemPROJ(project, index) {
  project.items.splice(index, 1);
}

// future feature
function sortPROJ(project, property, descending = true) {
  if (descending) {
    project.items = project.items.sort((a, b) => (a[property] > b[property]) ? -1 : 1);
  } else {
    project.items = project.items.sort((a, b) => (a[property] > b[property]) ? 1 : -1);
  }
}

export { Project, addItemPROJ, removeItemPROJ };