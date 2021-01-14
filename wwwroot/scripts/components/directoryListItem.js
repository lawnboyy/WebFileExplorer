/**
 * Factory function that creates and returns a directory list item as an HTML element.
 * @param {object} dir The directory object to render.
 * @param {function} onClicked Event handler for clicking this directory item.
 * @returns {object} Returns an HTML element.
 */
export const DirectoryListItem = (dir, onClicked) => {
  const directoryListItem = document.createElement("li");
  directoryListItem.id = dir.fullName;

  // Container div under each li that will flex content...
  const containerDiv = document.createElement("div");
  containerDiv.style = "display: flex; width: 100%";
  directoryListItem.appendChild(containerDiv);  

  // Inner div that will contain the directory name
  const directoryNameDiv = document.createElement("div");
  directoryNameDiv.style = "width: 40%";
  directoryNameDiv.innerHTML = `<a href="#">${dir.name}</a>`;
  directoryNameDiv.style.fontWeight = "900";
  directoryNameDiv.title = dir.fullName;
  containerDiv.appendChild(directoryNameDiv);

  // Inner div that will contain a div that displays the directory content count.
  const directorySizeContainerDiv = document.createElement("div");
  directorySizeContainerDiv.style = "display: flex; justify-content: flex-end; width: 50%";
  containerDiv.appendChild(directorySizeContainerDiv);

  // Inner div that will house the right-justified content count.
  const directorySizeInnerDiv = document.createElement("div");
  directorySizeInnerDiv.innerHTML = `(${dir.itemCount})`;
  directorySizeContainerDiv.appendChild(directorySizeInnerDiv);  

  directoryListItem.onclick = () => {
    onClicked(dir.fullName);
  }

  return directoryListItem;
};