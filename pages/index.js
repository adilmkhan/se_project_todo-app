import Section from "../components/Section.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Todo from "../components/Todo.js";
import { initialTodos, validationConfig } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

//instantiate the TodoCounter
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

function handleTotalCreate() {
  todoCounter.updateTotal(true);
}

function handleTotalDelete() {
  todoCounter.updateTotal(false);
}

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    handleCheck,
    handleDelete,
    handleTotalDelete
  );
  const todoElement = todo.getView();
  return todoElement;
};

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    const name = values.name;
    const dateInput = values.date;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const todovalues = { name, date, id, completed: false };
    // renderTodo(values);
    const todo = generateTodo(todovalues);
    section.addItem(todo);
    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
  handleTotalCreate,
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos, // pass intial TODOs
  renderer: (item) => {
    // Generate TODO item
    // Add it to the TODO list
    // Refer to the foreach loop in this file
    const todo = generateTodo(item);
    // section.addItem(todo);
    return todo;
  },
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

newTodoValidator.enableValidation();
