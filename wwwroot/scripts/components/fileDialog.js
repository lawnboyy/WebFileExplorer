//import { fetchFiles } from "../api/fileApi.js";
import { Button } from "./button.js";
import { DirectoryContentList } from "./directoryContentList.js";
import { decodeUrl } from "../utilities/urlUtility.js";
import { Search } from "./search.js";

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

    // Add search control
    toolbarDiv.appendChild(Search("file-search", null));

    // Add browse button
    toolbarDiv.appendChild(Button("browseButton", "Browse", null));

    // Add close button
    const closeButton = Button("closeButton", "Close", onCloseClicked);
    toolbarDiv.appendChild(closeButton);

    // Add the toolbar
    dialog.appendChild(toolbarDiv);

    // Add the directory contents component...
    const directoryContents = new DirectoryContentList("dir-contents", path);
    dialog.appendChild(directoryContents.getDirectoryContents());


    return dialog;
};