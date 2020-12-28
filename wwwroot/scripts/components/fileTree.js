import { DirectoryListItem } from "./directoryListItem.js";
import { FileListItem } from "./fileListItem.js";

export class FileTree {
    #fileTree;
    #rootDir;

    constructor(id, rootDir) {
        this.#rootDir = rootDir;
        this.#fileTree = document.createElement("ul");
        this.#fileTree.id = this.id;
    }

    #onDirectoryClicked = (dir) => {
        this.#rootDir = dir;
        this.#buildFileTree();
    };

    #buildFileTree() {
        this.#fileTree.innerHTML = "";
        for (var i = 0; i < this.#rootDir.subDirectories.length; i++) {
            this.#fileTree.appendChild(
                DirectoryListItem(
                    this.#rootDir.subDirectories[i].fullName,
                    this.#rootDir.subDirectories[i],
                    this.#onDirectoryClicked));
        }

        for (var i = 0; i < this.#rootDir.files.length; i++) {
            this.#fileTree.appendChild(
                FileListItem(this.#rootDir.files[i].fullName, this.#rootDir.files[i]));
        }

        return this.#fileTree;
    };

    getFileTree = () => {
        return this.#buildFileTree();
    };

};