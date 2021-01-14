import { Button } from "./button.js";
import { DirectoryContentList } from "./directoryContentList.js";
import { getAppState } from "../utilities/appStateUtility.js";
import { SearchTool } from "./searchTool.js";
import { SearchResults } from "./searchResults.js";
import { UploadTool } from "./uploadTool.js";

const searchResultsId = "search-results";

/**
 * Factory function that creates and returns an HTML dialog for the file management.
 * @param {string} id This string will be used for the HTML id.
 * @param {string} text This string will be used for the title display text.
 * @returns {object} Returns an HTML dialog element.
 */
export const FileDialog = (id, text) => {
  const dialog = document.createElement("dialog");
  dialog.id = id;
  dialog.style = "width: 50%; height: 75%; overflow: auto";
  dialog.innerHTML = text;

  
  // Handler for the close button.
  const onCloseClicked = () => {
    dialog.open = false;
  };

  // Deep link to current path...
  const path = getAppState().path;

  // Create close dialog button
  const toolbarDiv = document.createElement("div");
  toolbarDiv.style = "display: flex";

  // Create directory contents control
  const directoryContents = new DirectoryContentList("dir-contents", path);
  const dirContentsContainer = directoryContents.getDirectoryContents()

  // Add search control
  let results = null;
  // Event handler for clicking the search. Hides the browsing
  // UI and displays the results of the file search.
  const onSearchToolClicked = (term) => {
    if (results) {
      const resultsElement = document.getElementById(searchResultsId);
      if (resultsElement)
        dialog.removeChild(resultsElement);
    }
    results = SearchResults(searchResultsId, term);
    dirContentsContainer.style = "display: none";
    dialog.appendChild(results);
  };
  toolbarDiv.appendChild(SearchTool("file-search", onSearchToolClicked));

  // Add browse button
  const onBrowseClicked = () => {
    if (results) {
      const resultsElement = document.getElementById(searchResultsId);
      if (resultsElement)
        dialog.removeChild(resultsElement);
    }

    // Un-hide the directory contents...
    dirContentsContainer.style = "display: block";
  };
  toolbarDiv.appendChild(Button("browseButton", "Browse", onBrowseClicked, "Click here to return to browsing from search results."));

  // Add close button
  const closeButton = Button("closeButton", "Close", onCloseClicked);
  toolbarDiv.appendChild(closeButton);

  // Add the toolbar
  dialog.appendChild(toolbarDiv);

  // Add the upload file button.
  dialog.appendChild(UploadTool("upload-file-btn"));

  // Add the directory contents component...    
  dialog.appendChild(dirContentsContainer);

  return dialog;
};