import { formatDiskSize } from "../utilities/fileUtility.js";

export const FileListItem = (id, file) => {
  // Top level list item element that will contain the file attribute content.
  const fileListItem = document.createElement("li");
  fileListItem.id = id;

  // Container div under each li that will flex content...
  const containerDiv = document.createElement("div");
  containerDiv.style = "display: flex; width: 100%";
  fileListItem.appendChild(containerDiv);

  // Inner div that will contain the file name
  const fileNameDiv = document.createElement("div");
  fileNameDiv.style = "width: 50%";
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