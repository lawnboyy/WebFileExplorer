import { Button } from "./button.js";

/**
 * Factory function that creates and returns an HTML delete button.
 * @param {string} id This string will be used for the HTML id.
 * @param {function} onButtonClicked Event handler for the button clicked event.
 * @returns {object} Returns an HTML button element.
 */
export const DeleteButton = (id, onButtonClicked) => {
  const deleteButton = Button(id, "", onButtonClicked);
  const image = document.createElement("i");
  image.className = "fa fa-trash";
  deleteButton.appendChild(image);

  return deleteButton;
};