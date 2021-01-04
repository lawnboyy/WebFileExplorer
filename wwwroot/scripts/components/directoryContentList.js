import { DirectoryListItem } from "./directoryListItem.js";
import { FileListItem } from "./fileListItem.js";
import { Button } from "./button.js";
import { fetchDirectory } from "../api/api.js";
import { encodeUrl } from "../utilities/urlUtility.js";

export class DirectoryContentList {
    #container;
    #contentList;
    #directory;

    constructor(id, path) {
        this.#container = document.createElement("div");
        this.#contentList = document.createElement("ul");
        this.#container.appendChild(Button("backButton", "Up", this.#onUpClicked));
        this.#container.appendChild(this.#contentList);        
        this.#contentList.id = this.id;
        this.#buildContent(path);

        window.onpopstate = (event) => {
            if (event.state) {
                this.#buildContent(event.state.data);
            }
        };
    }

    #updateState() {
        const path = encodeUrl(this.#directory.fullName);
        window.history.pushState({ data: this.#directory.fullName }, "", path === "" ? "/" : path);
    }

    #buildContent(path) {
        const _this = this;
        fetchDirectory(path)
            .then((dir) => {
                _this.#directory = dir;
                _this.#render();
                _this.#updateState();
            });
    }

    #render() {
        this.#contentList.innerHTML = "";
        for (var i = 0; i < this.#directory.subDirectories.length; i++) {
            // Lookup the subdirectory to get the short name...
            const subDirFullName = this.#directory.subDirectories[i]
            const subDirShortName = this.#getShortName(this.#directory.subDirectories[i]);
            this.#contentList.appendChild(
                DirectoryListItem(
                    subDirFullName,
                    subDirShortName,
                    this.#onDirectoryClicked));
        }

        for (var i = 0; i < this.#directory.files.length; i++) {
            this.#contentList.appendChild(
                FileListItem(this.#directory.files[i].fullName, this.#directory.files[i]));
        }

        return this.#contentList;
    };

    #onUpClicked = () => {
        if (this.#directory.parent !== null) {
            this.#buildContent(this.#directory.parent);
        }
    };

    #getShortName = (path) => {
        const paths = path.split("\\");
        return paths.length > 0 ? paths[paths.length - 1] : "";
    };

    #onDirectoryClicked = (dirName) => {
        this.#buildContent(dirName);
    };

    getDirectoryContents = () => {
        return this.#container;
    };
};