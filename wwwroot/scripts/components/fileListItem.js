import { DeleteButton } from "./deleteButton.js";
import { DownloadButton } from "./downloadButton.js";
import { deleteFile, downloadFile } from "../api/api.js";
import { formatDiskSize } from "../utilities/fileUtility.js";
import { contentUpdated } from "../utilities/appStateUtility.js";

/**
 * Factory function that creates and returns a file list item as an HTML element.
 * @param {string} id The id to give this HTML element.
 * @param {object} file The file object to render.
 * @returns {object} Returns an HTML element that represents a file.
 */
export const FileListItem = (id, file) => {
  // Top level list item element that will contain the file attribute content.
  const fileListItem = document.createElement("li");
  fileListItem.id = id;

  // Container div under each li that will flex content...
  const containerDiv = document.createElement("div");
  containerDiv.style = "display: flex; width: 100%";
  fileListItem.appendChild(containerDiv);

  // Download clicke handler that will fetch the file.
  const onDownloadClicked = async () => {
    await downloadFile(file);
  };

  // Inner div that will contain the download button.
  const downloadButtonDiv = document.createElement("div");
  downloadButtonDiv.style = "margin-right: 5px";
  downloadButtonDiv.appendChild(DownloadButton(`${file.fullName}-download-btn`, onDownloadClicked));
  containerDiv.appendChild(downloadButtonDiv);

  // Delete click handler that will delete the file.
  const onDeleteClicked = async () => {
    const confirmed = confirm("Are you sure you want to delete this file?");
    if (confirmed) {
      await deleteFile(file.fullName);
      contentUpdated();
    }
  };

  // Inner div to contain the delete button
  const deleteButtonDiv = document.createElement("div");
  deleteButtonDiv.style = "margin-right: 5px";
  deleteButtonDiv.appendChild(DeleteButton(`${file.fullName}-delete-btn`, onDeleteClicked));
  containerDiv.appendChild(deleteButtonDiv);

  // Inner div that will contain the file name
  const fileNameDiv = document.createElement("div");
  fileNameDiv.style = "width: 40%; margin-right: 5px";
  fileNameDiv.innerHTML = `${file.name}`;
  fileNameDiv.title = file.fullName;
  containerDiv.appendChild(fileNameDiv);

  // Inner div that will contain a div that displays the size of the file right justified.
  const fileSizeContainerDiv = document.createElement("div");
  fileSizeContainerDiv.style = "display: flex; justify-content: flex-end; width: 50%";
  containerDiv.appendChild(fileSizeContainerDiv);

  // Inner div that will house the right-justified file size.
  const fileSizeInnerDiv = document.createElement("div");
  const diskSize = formatDiskSize(file.sizeInBytes);
  fileSizeInnerDiv.innerHTML = `${diskSize}`;
  fileSizeContainerDiv.appendChild(fileSizeInnerDiv);

  return fileListItem;
};