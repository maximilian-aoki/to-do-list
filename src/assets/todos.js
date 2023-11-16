// To-do 'class'
const Todo = function(inputObj) {
  // USER-GENERATED PROPERTIES
  let title = inputObj.title;
  let description = inputObj.description;
  let dueDate = inputObj.dueDate;
  let priority = inputObj.priority;
  let notes = inputObj.notes;

  // AUTO PROPERTIES
  let dateCreated = _getDate();
  let completed = false;

  function _getDate() {
    return new Date();
  }

  function edit(editObj) {
    this.title = editObj.title;
    this.description = editObj.description;
    this.dueDate = editObj.dueDate;
    this.priority = editObj.priority;
    this.notes = editObj.notes;
  }

  function toggleCompleted() {
    this.completed = this.completed ? false : true;
  }

  return { 
    // properties
    title, 
    description, 
    dueDate, 
    priority, 
    notes, 
    dateCreated, 
    completed, 

    // public methods
    edit, 
    toggleCompleted,
  };
};

export { Todo };