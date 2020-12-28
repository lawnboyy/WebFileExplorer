import { DirectoryListItem } from "./directoryListItem.js";
import { FileListItem } from "./fileListItem.js";
import { Button } from "./button.js";

export class FileTree {
    #container;
    #fileTree;
    #rootDir;
    #currentDir;

    #buildFileTree() {
        this.#fileTree.innerHTML = "";
        for (var i = 0; i < this.#currentDir.subDirectories.length; i++) {
            this.#fileTree.appendChild(
                DirectoryListItem(
                    this.#currentDir.subDirectories[i].fullName,
                    this.#currentDir.subDirectories[i],
                    this.#onDirectoryClicked));
        }

        for (var i = 0; i < this.#currentDir.files.length; i++) {
            this.#fileTree.appendChild(
                FileListItem(this.#currentDir.files[i].fullName, this.#currentDir.files[i]));
        }

        return this.#fileTree;
    };

    #onParentClicked = () => {
        const directories = this.#currentDir.fullName.split("\\");
        directories.splice(0, 1);
        directories.splice(directories.length - 1, 1);        

        // Find the parent directory...
        let curr = this.#rootDir;
        for (var i = 1; i < directories.length; i++) {
            // Look for the next path from the root.
            for (var j = 0; j < curr.subDirectories.length; j++) {
                if (curr.subDirectories[j].name === directories[i]) {
                    curr = curr.subDirectories[j];
                    break;
                }
            }
        }

        this.#currentDir = curr;
        this.#buildFileTree();
    };

    constructor(id, rootDir) {
        this.#rootDir = rootDir;
        this.#currentDir = rootDir;
        this.#container = document.createElement("div");
        this.#fileTree = document.createElement("ul");
        this.#container.appendChild(this.#fileTree);
        this.#container.appendChild(Button("parentButton", "Parent", this.#onParentClicked));
        this.#fileTree.id = this.id;
        this.#buildFileTree();
    }

    #onDirectoryClicked = (dir) => {
        this.#currentDir = dir;
        this.#buildFileTree();
    };

    

    getFileTree = () => {
        return this.#container;
    };

};