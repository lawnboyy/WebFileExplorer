import { Button } from "./button.js";

export const DownloadButton = (id, onButtonClicked) => {
  const downloadButton = Button(id, "", onButtonClicked);
  const image = document.createElement("i");
  image.className = "fa fa-download";
  downloadButton.appendChild(image);

  return downloadButton;
};