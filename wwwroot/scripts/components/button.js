
export const Button = (id, text, onButtonClicked, style) => {
  const button = document.createElement("button");
  button.id = id;
  button.innerHTML = text;
  button.onclick = onButtonClicked;

  if (style) {
    button.style = style;
  }

  return button;
};