export const DirectoryListItem = (dirName, dirShortName, onClicked) => {
    const directoryListItem = document.createElement("li");
    directoryListItem.id = dirName;
    directoryListItem.innerHTML = `<a href="#">${dirShortName}</a>`;

    // Styling
    directoryListItem.style.fontWeight = "900";

    directoryListItem.onclick = () => {
        onClicked(dirName);
    }

    return directoryListItem;
};