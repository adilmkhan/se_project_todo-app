class Todo {
  constructor(data, selector) {
    // `this` here is the *new instance* created by `new Card(...)` or `new Subclass(...)`.
    // We store the selector for the template this instance will clone.
    this._data = data;
    this._selector = selector;
  }

  getView() {
    // Template Method: find the template in the DOM by the stored selector and clone it.
    // `this._cardSelector` comes from the constructor; `this` is still the same instance.
    const todoElement = document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = todoElement.querySelector(".todo__name");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    const todoDate = todoElement.querySelector(".todo__date");
    const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");

    return todoElement; // Return the DOM node to be filled by subclasses.
  }

  _setEventListeners() {
    // Attach interactions for this specific card DOM element.

    // We use ARROW FUNCTIONS so that `this` remains bound to the class instance.
    // If we used `function(){}`, then `this` inside the handler would be the DOM element,
    // not the class instance—breaking calls like `this._handleOpenPopup()`.
    this._element.addEventListener("click", () => {
      // Polymorphic call: if a subclass overrides _handleOpenPopup, that override runs.
      this._handleOpenPopup();
    });

    // Close button: also an arrow to preserve `this` as the card instance.
    popupCloseButton.addEventListener("click", () => {
      this._handleClosePopup();
    });
  }
}
