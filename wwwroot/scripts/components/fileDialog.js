import { fetchFiles } from "../api/fileApi.js";
import { Button } from "./button.js";
import { FileTree } from "./fileTree.js";

export const FileDialog = (id, text) => {
    const dialog = document.createElement("dialog");
    dialog.id = id;
    dialog.innerHTML = text;

    const onCloseClicked = () => {
        dialog.open = false;
    };

    const closeButton = Button("closeButton", "Close", onCloseClicked);
    dialog.appendChild(closeButton);

    fetchFiles().then((results) => {
        const fileTree = new FileTree("fileList", results);
        dialog.appendChild(fileTree.getFileTree());
    });

    return dialog;
};