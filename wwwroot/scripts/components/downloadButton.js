import { Button } from "./button.js";

/**
 * Factory function that creates and returns an HTML download button.
 * @param {string} id This string will be used for the HTML id.
 * @param {function} onButtonClicked Event handler for the download button clicked event.
 * @returns {object} Returns an HTML button element.
 */
export const DownloadButton = (id, onButtonClicked) => {
  const downloadButton = Button(id, "", onButtonClicked);
  const image = document.createElement("i");
  image.className = "fa fa-download";
  downloadButton.appendChild(image);

  return downloadButton;
};