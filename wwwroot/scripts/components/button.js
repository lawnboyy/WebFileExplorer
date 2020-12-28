
export const Button = (id, text, onButtonClicked) => {
    const button = document.createElement("button");
    button.id = id;
    button.innerHTML = text;
    button.onclick = onButtonClicked;

    return button;
};