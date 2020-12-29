import { DirectoryListItem } from "./directoryListItem.js";
import { FileListItem } from "./fileListItem.js";
import { Button } from "./button.js";

export class FileTree {
    #container;
    #fileTree;
    #directoryTable;
    #currentDirName;

    #buildFileTree() {
        this.#fileTree.innerHTML = "";
        const currDirectory = this.#directoryTable.directoryLookup[this.#currentDirName];
        for (var i = 0; i < currDirectory.subDirectories.length; i++) {
            // Lookup the subdirectory to get the short name...
            const subDirFullName = currDirectory.subDirectories[i]
            const subDir = this.#directoryTable.directoryLookup[subDirFullName];
            this.#fileTree.appendChild(
                DirectoryListItem(
                    subDirFullName,
                    subDir.name,
                    this.#onDirectoryClicked));
        }

        for (var i = 0; i < currDirectory.files.length; i++) {
            this.#fileTree.appendChild(
                FileListItem(currDirectory.files[i].fullName, currDirectory.files[i]));
        }

        return this.#fileTree;
    };

    #onBackClicked = () => {
        const currDir = this.#directoryTable.directoryLookup[this.#currentDirName];
        if (currDir.parent) {
            this.#currentDirName = currDir.parent;
            this.#buildFileTree();
        }        
    };

    constructor(id, directoryTable) {
        this.#directoryTable = directoryTable;
        this.#currentDirName = directoryTable.root;
        this.#container = document.createElement("div");
        this.#fileTree = document.createElement("ul");
        this.#container.appendChild(this.#fileTree);
        this.#container.appendChild(Button("backButton", "Back", this.#onBackClicked));
        this.#fileTree.id = this.id;
        this.#buildFileTree();
    }

    #onDirectoryClicked = (dirName) => {
        this.#currentDirName = dirName;
        this.#buildFileTree();
    };

    

    getFileTree = () => {
        return this.#container;
    };

};