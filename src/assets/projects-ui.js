// import modules
import * as Events from './events.js';

let ProjectsUI = (function() {
  // cache DOM
  const projList = document.querySelector('.project-list');

  // event binding
  projList.addEventListener('click', projectAction);

  // methods
  function renderProjects(application) {
    removeElements(projList);
    for (let project of application.projects) {
      const index = application.projects.indexOf(project);
      projList.appendChild(createProject(project, index));
    }
    projList.appendChild(createAddProject());
  }

  function removeElements(parent) {
    let childElements = Array.from(parent.children)
    for (let child of childElements) {
      parent.removeChild(child);
    }
  }

  function createProject(project, index) {
    const newProject = document.createElement('div');
    newProject.setAttribute('data-index', index);

    const projectTitle = project.title ? project.title : 'Untitled Project';

    newProject.innerHTML = 
    `
    <div class="project-meta">
      <p>${projectTitle}</p>
      <p class="task-meta">open tasks: 0</p>
    </div>
    <button type="button" class="delete-button"></button>
    `
    ;

    return newProject;
  }

  function createAddProject() {
    const newAddProject = document.createElement('div');
    newAddProject.classList.add('project-add');
    newAddProject.innerHTML = 
      `
      <p>Add A Project!</p>
      <div class="add-button"></div>
      `
    ;

    return newAddProject;
  }

  function projectAction(e) {
    if (e.target.closest('.delete-button')) {
      deleteProject(e.target.closest('div[data-index]').getAttribute('data-index'));
    } else if (e.target.closest('div[data-index]')) {
      selectProject(e.target.closest('div[data-index]').getAttribute('data-index'));
    } else if (e.target.closest('.project-add')) {
      addProject();
    }
  }

  function deleteProject(index) {
    Events.emit('deleteProject', index);
  }

  function selectProject(index) {
    Events.emit('selectProject', index);
  }

  function addProject() {
    Events.emit('addProject', null);
  }

  return { renderProjects };

})();

// export
export { ProjectsUI };