// import css
import './static/reset.css';
import './static/style.css';

// import modules
import * as Events from './assets/events.js';
import { Project } from './assets/projects.js';
import { ProjectsUI } from './assets/projects-ui.js';
import { TodosUI } from './assets/todos-ui.js';
import { dialogUI } from './assets/dialog-ui.js';

// user application 'class'
const Application = function() {
  let projects = [];
  let currentProject = undefined;

  function addProject() {
    this.projects.push(Project());
  }

  function removeProject(index) {
    this.projects.splice(index, 1);
  }

  return { projects, addProject, removeProject };
};

// TEST VALUES //

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
  title: "Week-to-Week",
  description: "week to week activities"
}


// init program - later get this from local storage!
let application = Application();
application.addProject();
application.addProject();

application.projects[0].edit(testProj1);
application.projects[1].edit(testProj2);

application.projects[0].addItem(testObj1);
application.projects[0].addItem(testObj2);
application.projects[1].addItem(testObj3);


// custom event handling - master app
Events.on('addProject', addProject);
Events.on('deleteProject', deleteProject);
Events.on('selectProject', selectProject);
Events.on('renderProjects', renderProjects);
Events.on('changeProjName', changeProjName);
Events.on('changeProjDesc', changeProjDesc);

Events.on('renderContent', renderContent);

// custom event handling - to-dos
Events.on('deleteItem', deleteItem);
Events.on('openModal', openModal);
Events.on('toggleItemStatus', toggleItemStatus);

// master app methods
function addProject() {
  application.addProject();
  application.currentProject = application.projects[application.projects.length - 1];
  renderProjects();
  renderContent();
}

function deleteProject(index) {
  application.removeProject(index);
  application.currentProject = application.projects[application.projects.length - 1];
  renderProjects();
  renderContent();
}

function selectProject(index) {
  application.currentProject = application.projects[index];
  renderContent();
}

function renderProjects() {
  ProjectsUI.renderProjects(application);
}

function changeProjName(string) {
  application.currentProject.title = string;
  renderProjects();
}

function changeProjDesc(string) {
  application.currentProject.description = string;
}

function renderContent() {
  TodosUI.renderContent(application.currentProject);
}

// to-do methods
function deleteItem(index) {
  application.currentProject.removeItem(index);
  renderContent();
}

function toggleItemStatus(index) {
  application.currentProject.items[index].toggleCompleted();
  renderContent();
}

function openModal(index) {
  application.currentProject.currentItem = application.currentProject.items[index];
  dialogUI.createDialog(application.currentProject.currentItem);
}

// INIT TESTING
Events.emit('renderProjects', application);
Events.emit('renderContent', application.currentProject);