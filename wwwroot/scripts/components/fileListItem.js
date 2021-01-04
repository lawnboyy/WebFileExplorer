export const FileListItem = (id, file) => {
    const fileListItem = document.createElement("li");
    fileListItem.id = id;
    fileListItem.innerHTML = file.name;
    fileListItem.title = file.fullName;

    return fileListItem;
};