//import { fetchFiles } from "../api/fileApi.js";
import { Button } from "./button.js";
import { DirectoryContentList } from "./directoryContentList.js";
import { decodeUrl } from "../utilities/urlUtility.js";
import { SearchTool } from "./searchTool.js";
import { SearchResults } from "./searchResults.js";

const onSearchClicked = () => {

};

export const FileDialog = (id, text) => {
    const dialog = document.createElement("dialog");
    dialog.id = id;
    dialog.innerHTML = text;

    const onCloseClicked = () => {
        dialog.open = false;
    };



    // Deep link to current path...
    const path = window.location.pathname && window.location.pathname !== "/" ? decodeUrl(window.location.pathname) : "";

    // Create close dialog button
    const toolbarDiv = document.createElement("div");
    toolbarDiv.style = "display: flex";

    // Create directory contents control
    const directoryContents = new DirectoryContentList("dir-contents", path);
    const dirContentsContainer = directoryContents.getDirectoryContents()

    // Add search control
    let results = null;
    const onSearchToolClicked = (term) => {
        results = SearchResults("search-results", term);
        dirContentsContainer.style = "display: none";
        dialog.appendChild(results);
    };
    toolbarDiv.appendChild(SearchTool("file-search", onSearchToolClicked));

    // Add browse button
    const onBrowseClicked = () => {
        if (results) {
            dialog.removeChild(results);
        }

        // Un-hide the directory contents...
        dirContentsContainer.style = "display: block";
    };
    toolbarDiv.appendChild(Button("browseButton", "Browse", onBrowseClicked));

    // Add close button
    const closeButton = Button("closeButton", "Close", onSearchClicked);
    toolbarDiv.appendChild(closeButton);

    // Add the toolbar
    dialog.appendChild(toolbarDiv);

    // Add the directory contents component...    
    dialog.appendChild(dirContentsContainer);


    return dialog;
};