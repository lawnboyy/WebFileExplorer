import { onButtonClicked } from "./eventHandler.js";

var button = document.getElementById("testButton");
button.addEventListener("click", function (e) {
    onButtonClicked();
}, false);