import Section from "../components/Section.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Todo from "../components/Todo.js";
import { initialTodos, validationConfig } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
// const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: () => {},
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

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// addTodoCloseBtn.addEventListener("click", () => {
//   addTodoPopup.close();
// });

// function renderTodo(item) {
//   const todo = generateTodo(item);
//   todosList.append(todo);
// }

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();
//   const values = { name, date, id, completed: false };
//   // renderTodo(values);
//   const todo = generateTodo(values);
//   section.addItem(todo);
//   newTodoValidator.resetValidation();
//   addTodoPopup.close();
// });

// initialTodos.forEach((item) => {
//   const todo = generateTodo(item);
//   todosList.append(todo);
// });

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

newTodoValidator.enableValidation();
