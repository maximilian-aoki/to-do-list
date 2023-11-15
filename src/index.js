// import css
import './static/reset.css';
import './static/style.css';

// import modules
import * as Events from './assets/events.js';
import { Todo } from './assets/todos.js';

// core application logic
const Application = (function() {
  let projects = [];

  return { projects };
})();


// TESTING
let testObj = {
  title: "Grocery List",
  description: "This is for groceries",
  dueDate: "Today",
  priority: "High",
  notes: "There will be more things to get at corner store",
}

let editObj = {
  title: "Shopping List",
  // description: "This is for shopping",
  dueDate: "Tomorrow",
  // priority: "Low",
  notes: "Get gas on way back!",
}

let newTodo = Todo(testObj);
newTodo.edit(editObj);
newTodo.edit(testObj);
newTodo.toggleCompleted();
console.log(newTodo);