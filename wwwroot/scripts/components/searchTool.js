import { Button } from "./button.js";

/**
 * Factory function that returns an HTML element representing the search
 * functionality.
 * @param {string} id The id to give this HTML element.
 * @param {function} onSearchClicked Event handler for clicking the search button.
 * @returns {object} Returns an HTML element that represents the list of
 * results.
 */
export const SearchTool = (id, onSearchClicked) => {
  const searchDiv = document.createElement("div");
  searchDiv.id = id;
  const searchInput = document.createElement("input");
  searchDiv.appendChild(searchInput);

  const onSearchButtonClicked = () => {
    onSearchClicked(searchInput.value);
  };

  const searchButton = Button("search-btn", "Search", onSearchButtonClicked, "Search for files.");
  searchDiv.appendChild(searchButton);

  return searchDiv;
};