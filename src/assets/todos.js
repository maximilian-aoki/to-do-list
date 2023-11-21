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

  return { title, description, dueDate, priority, notes, dateCreated, completed, };
};

function editTODO(item, editObj) {
  item.title = editObj.title;
  item.description = editObj.description;
  item.dueDate = editObj.dueDate;
  item.priority = editObj.priority;
  item.notes = editObj.notes;
}

function toggleCompletedTODO(item) {
  item.completed = item.completed ? false : true;
}

export { Todo, editTODO, toggleCompletedTODO };