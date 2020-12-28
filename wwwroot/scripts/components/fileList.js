import { FileListItem } from "./fileListItem.js";

export const FileList = (id, files) => {
    const fileList = document.createElement("ul");
    fileList.id = id;
    for (var i = 0; i < files.length; i++) {
        fileList.appendChild(FileListItem(files[i].name, files[i]));
    }
    // fileList.append(files.map(f => FileListItem(f.name, f)));
    return fileList;
};