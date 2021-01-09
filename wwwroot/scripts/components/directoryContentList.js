import { DirectoryListItem } from "./directoryListItem.js";
import { FileListItem } from "./fileListItem.js";
import { Button } from "./button.js";
import { fetchDirectory } from "../api/api.js";
import { updatePath } from "../utilities/appStateUtility.js";
import { subscribeToContentUpdate } from "../utilities/appStateUtility.js";

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

    subscribeToContentUpdate(this.#updateContent);

    window.onpopstate = (event) => {
      if (event.state) {
        this.#buildContent(event.state.data);
      }
    };
  }

  #updateContent = () => {
    this.#buildContent(this.#directory.fullName);
  }

  #buildContent(path) {
    const _this = this;
    fetchDirectory(path)
      .then((dir) => {
        _this.#directory = dir;
        _this.#render();
        updatePath(_this.#directory.fullName)
      });
  }

  #render() {
    this.#contentList.innerHTML = "";
    for (var i = 0; i < this.#directory.subDirectories.length; i++) {
      this.#contentList.appendChild(
        DirectoryListItem(this.#directory.subDirectories[i], this.#onDirectoryClicked));
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