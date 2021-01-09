import { Button } from "./button.js";
import { getAppState } from "../utilities/appStateUtility.js";
import { uploadFile } from "../api/api.js";

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

  const onUploadClicked = () => {
    const state = getAppState();
    uploadFile(state.path, file);
  };

  const uploadButton = Button("upload-btn", "Upload", onUploadClicked);

  container.appendChild(select);
  container.appendChild(uploadButton);

  return container;
};