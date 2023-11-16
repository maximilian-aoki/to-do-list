// import css
import './static/reset.css';
import './static/style.css';

// import modules
import * as Events from './assets/events.js';
import { Todo } from './assets/todos.js';
import { Project } from './assets/projects.js';


// user application 'class'
const Application = function() {
  let projects = [];

  function addProject() {
    this.projects.push(Project());
  }

  function removeProject(index) {
    this.projects.splice(index, 1);
  }

  return { projects, addProject, removeProject };
};

// init program - later get this from local storage!
let application = Application();
application.addProject();


// TESTING! //
let testObj1 = {
  title: "Groceries",
  description: "This is for groceries",
  dueDate: 2,
  priority: 1,
  notes: "There will be more things to get at corner store",
}

let testObj2 = {
  title: "Shopping",
  description: "This is for shopping",
  dueDate: 0,
  priority: 2,
  notes: "Get gas on way back!",
}

let testObj3 = {
  title: "New Video",
  description: "Make a new vid",
  dueDate: 1,
  priority: 0,
  notes: "Use Adobe",
}

let testProj1 = {
  title: "Day-To-Day",
  description: "day to day activities"
}

let testProj2 = {
  title: "Week-to-week",
  description: "week to week activities"
}
