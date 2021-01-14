/**
 * Factory function that creates and returns an HTML button.
 * @param {string} id This string will be used for the HTML id.
 * @param {string} text This string will be used for the button display text.
 * @param {function} onButtonClicked Event handler for the button clicked event.
 * @param {string} title Button tooltip.
 * @param {object} style Optional styling to apply to the button.
 * @returns {object} Returns an HTML button element.
 */
export const Button = (id, text, onButtonClicked, title, style) => {
  const button = document.createElement("button");
  button.id = id;
  button.innerHTML = text;
  button.onclick = onButtonClicked;

  if (title)
    button.title = title;

  if (style)
    button.style = style;

  return button;
};