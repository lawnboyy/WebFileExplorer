//import { fetchFiles } from "../api/fileApi.js";
import { Button } from "./button.js";
import { DirectoryContentList } from "./directoryContentList.js";

export const FileDialog = (id, text) => {
    const dialog = document.createElement("dialog");
    dialog.id = id;
    dialog.innerHTML = text;

    const onCloseClicked = () => {
        dialog.open = false;
    };

    const closeButton = Button("closeButton", "Close", onCloseClicked);

    // TODO: Add deep linking here...
    // const path = window.location.pathname && window.location.pathname !== "/" ? this.#decodeDirectory(window.location.pathname) : "";
    const fileTree = new DirectoryContentList("fileList", "");
    dialog.appendChild(fileTree.getFileTree());
    const closeDiv = document.createElement("div");
    closeDiv.appendChild(closeButton);
    dialog.appendChild(closeDiv);

    return dialog;
};