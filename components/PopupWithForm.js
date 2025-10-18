import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, handleTotalCreate }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._handleTotalCreate = handleTotalCreate;
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      //add a key/value pair to the value object for each input
      // the key is input.name
      // the value is input.value
      values[input.name] = input.value;
      // need brackets notation, not dot notaion
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // TODO - Pass result of _getInputValues to submission handler
      this._handleFormSubmit(this._getInputValues());
      this._handleTotalCreate();
    });
  }
}

export default PopupWithForm;
