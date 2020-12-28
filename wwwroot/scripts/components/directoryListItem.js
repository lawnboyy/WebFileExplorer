export const DirectoryListItem = (id, dir, onClicked) => {
    const directoryListItem = document.createElement("li");
    directoryListItem.id = id;
    directoryListItem.innerHTML = `<a href="#">${dir.name}</a>`;

    // Styling
    directoryListItem.style.fontWeight = "900";

    directoryListItem.onclick = () => {
        onClicked(dir);
    }

    return directoryListItem;
};