import { DirectoryListItem } from "./directoryListItem.js";
import { FileListItem } from "./fileListItem.js";
import { Button } from "./button.js";
import { fetchDirectory } from "../api/api.js";
import { updatePath } from "../utilities/appStateUtility.js";
import { subscribeToContentUpdate } from "../utilities/appStateUtility.js";

/** Class representing the directory content list HTML component. */
export class DirectoryContentList {
  // The main HTML div container for this component.
  #container;
  // The HTML list component that will house the directory contents (files and subfolders)
  #contentList;
  // The directory object that contains the contents to display.
  #directory;

  constructor(id, path) {
    this.#container = document.createElement("div");
    this.#container.id = id;
    this.#contentList = document.createElement("ul");
    // This button allows the user to go navigate to the parent directory from the current directory.
    this.#container.appendChild(Button("backButton", "Up", this.#onUpClicked, "Return to the parent directory."));
    this.#container.appendChild(this.#contentList);
    this.#contentList.id = "directory-contents-li";
    this.#buildContent(path);

    // Subscribe to the content updates so that if files are uploaded to this directory
    // this component will update its contents view to include the new file.
    subscribeToContentUpdate(this.#updateContent);

    // Wire up the browser back button event such that the component will load
    // the previously viewed directory. The browser back button works, but it
    // adds a hash to the URL for some reason. So sometimes you have to click
    // the browser back button twice to get back to the previous state. I have
    // not been able to determine a fix for this yet.
    window.onpopstate = (event) => {
      if (event.state) {
        this.#buildContent(event.state.data);
      }
    };
  }

  /**
   * Handler for any update events we receive, such as when a new file
   * has been added to the directory. This handler will rebuild the
   * component with the updated content.
   */
  #updateContent = () => {
    this.#buildContent(this.#directory.fullName);
  }

  /**
   * Given the path, fetches the directory contents and renders the component.
   * @param {string} path The path of the directory to display.
   */
  // TODO: Look at using async/await for this.
  #buildContent(path) {
    const _this = this;
    fetchDirectory(path)
      .then((dir) => {
        _this.#directory = dir;
        _this.#render();
        updatePath(_this.#directory.fullName)
      });
  }

  /**
   * Renders the component using the directory object member.
   */
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
  };

  /**
   * If the current directory has a parent, then fetch it's contents and
   * render the component.
   */
  #onUpClicked = () => {
    if (this.#directory.parent !== null) {
      this.#buildContent(this.#directory.parent);
    }
  };

  /**
   * Event handler for clicking a subfolder. Will fetch and render
   * the component using the given subfolder full path.
   * @param {string} dirFullName The full path of the subfolder.
   */
  #onDirectoryClicked = (dirFullName) => {
    this.#buildContent(dirFullName);
  };

  /**
   * Function that returns the container div. Parent component uses this
   * to get a reference to the HTML element to add as a child.
   * @returns {object} HTML element that contains this component.
   */
  getDirectoryContents = () => {
    return this.#container;
  };
};