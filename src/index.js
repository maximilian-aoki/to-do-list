// import css
import './static/reset.css';
import './static/style.css';

// import modules
import * as Events from './assets/events.js';
import { Project, editPROJ, addItemPROJ, removeItemPROJ } from './assets/projects.js';
import { editTODO, toggleCompletedTODO } from './assets/todos.js';
import { ProjectsUI } from './assets/projects-ui.js';
import { TodosUI } from './assets/todos-ui.js';
import { dialogUI } from './assets/dialog-ui.js';

// user application 'class'
const Application = function() {
  let projects = [];
  let currentProject = undefined;

  return { projects, currentProject };
};

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
Events.on('toggleItemStatus', toggleItemStatus);
Events.on('openModal', openModal);
Events.on('submitModal', submitModal);

// master app methods
function addProject() {
  application.projects.push(Project());
  application.currentProject = application.projects[application.projects.length - 1];
  localStorage.setItem('app', JSON.stringify(application));
  renderProjects();
  renderContent();
}

function deleteProject(index) {
  application.projects.splice(index, 1);
  application.currentProject = application.projects[application.projects.length - 1];
  localStorage.setItem('app', JSON.stringify(application));
  renderProjects();
  renderContent();
}

function selectProject(index) {
  application.currentProject = application.projects[index];
  localStorage.setItem('app', JSON.stringify(application));
  renderContent();
}

function renderProjects() {
  ProjectsUI.renderProjects(application);
}

function changeProjName(string) {
  application.currentProject.title = string;
  localStorage.setItem('app', JSON.stringify(application));
  renderProjects();
}

function changeProjDesc(string) {
  application.currentProject.description = string;
  localStorage.setItem('app', JSON.stringify(application));
}

function renderContent() {
  TodosUI.renderContent(application.currentProject);
}

// to-do methods
function deleteItem(index) {
  removeItemPROJ(application.currentProject, index);
  localStorage.setItem('app', JSON.stringify(application));
  renderProjects();
  renderContent();
}

function toggleItemStatus(index) {
  toggleCompletedTODO(application.currentProject.items[index]);
  localStorage.setItem('app', JSON.stringify(application));
  renderProjects();
  renderContent();
}

function openModal(index) {
  application.currentProject.currentItem = application.currentProject.items[index];
  dialogUI.createDialog(application.currentProject.currentItem);
}

function submitModal(itemObj) {
  if (application.currentProject.currentItem) {
    editTODO(application.currentProject.currentItem, itemObj);
  } else {
    addItemPROJ(application.currentProject, itemObj);
  }
  localStorage.setItem('app', JSON.stringify(application));
  renderProjects();
  renderContent();
}

// INIT PROGRAM //
let application;

function initializeApp() {
  if (localStorage.getItem('app')) {
    application = JSON.parse(localStorage.getItem('app'));
    application.currentProject = getCurrentProject();
  } else {
    application = Application();
    application.projects.push(Project());
    application.currentProject = application.projects[0];
  }
  renderProjects();
  renderContent();
}

function getCurrentProject() {
  for (let project of application.projects) {
    if (project.dateCreated === application.currentProject.dateCreated) {
      return project;
    }
  }
}

initializeApp();
