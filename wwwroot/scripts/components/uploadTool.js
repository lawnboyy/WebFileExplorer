import { Button } from "./button.js";
import { contentUpdated, getAppState } from "../utilities/appStateUtility.js";
import { uploadFile } from "../api/api.js";

/**
 * Factory function that returns the file upload tool.
 * @param {string} id The id to give this HTML element.
 * @returns {object} Returns an HTML element that provides upload
 * functionality.
 */
export const UploadTool = (id) => {
  let file = null;
  const container = document.createElement("div");
  const select = document.createElement("input");
  select.type = "file";
  select.id = id;

  const fileSelected = (selectedFile) => {
    file = select.files[0];
  };

  select.addEventListener("change", fileSelected, false);

  // Grabs the current path from the app state and uploads the
  // given file.
  // TODO: Check for the existence of a file here.
  const onUploadClicked = () => {
    const state = getAppState();
    if (file) {
      uploadFile(state.path, file).then((response) => {
        contentUpdated();
        // Clear the file...
        file = null;
      });
    } else {
      alert("No file has been selected!");
    }
  };

  const uploadButton = Button("upload-btn", "Upload", onUploadClicked);

  container.appendChild(select);
  container.appendChild(uploadButton);

  return container;
};