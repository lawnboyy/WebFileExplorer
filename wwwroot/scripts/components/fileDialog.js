//import { fetchFiles } from "../api/fileApi.js";
import { Button } from "./button.js";
import { DirectoryContentList } from "./directoryContentList.js";
import { decodeUrl } from "../utilities/urlUtility.js"

export const FileDialog = (id, text) => {
    const dialog = document.createElement("dialog");
    dialog.id = id;
    dialog.innerHTML = text;

    const onCloseClicked = () => {
        dialog.open = false;
    };

    const closeButton = Button("closeButton", "Close", onCloseClicked);

    // TODO: Add deep linking here...
    const path = window.location.pathname && window.location.pathname !== "/" ? decodeUrl(window.location.pathname) : "";
    const fileTree = new DirectoryContentList("fileList", path);
    dialog.appendChild(fileTree.getFileTree());
    const closeDiv = document.createElement("div");
    closeDiv.appendChild(closeButton);
    dialog.appendChild(closeDiv);

    return dialog;
};