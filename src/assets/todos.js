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

  // private function to get current date - currently using built-in 'new Date()' but will need custom solution
  function _getDate() {
    return new Date();
  }

  // function to change targeted to-do instance properties, passing in an object containing 0 or more of the properties
  function edit(editObj) {
    this.title = editObj.title;
    this.description = editObj.description;
    this.dueDate = editObj.dueDate;
    this.priority = editObj.priority;
    this.notes = editObj.notes;
  }

  // toggles 'completed' property boolean
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

    // public functions
    edit, 
    toggleCompleted,
  };
};

export { Todo };