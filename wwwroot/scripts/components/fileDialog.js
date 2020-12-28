import { fetchFiles } from "../api/fileApi.js";
import { Button } from "./button.js";
import { FileList } from "./fileList.js";

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
        dialog.appendChild(FileList("fileList", results));
    });

    return dialog;
};