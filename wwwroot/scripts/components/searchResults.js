import { search } from "../api/api.js";
import { FileListItem } from "./fileListItem.js";

/**
 * Factory function that fetches and renders file search results that match
 * the given search term.
 * @param {string} id The id to give this HTML element.
 * @param {string} searchTerm The search term to use.
 * @returns {object} Returns an HTML element that represents the list of
 * results.
 */
export const SearchResults = (id, searchTerm) => {
  const container = document.createElement("div");
  container.id = id;
  const resultsList = document.createElement("ul");
  container.appendChild(resultsList);

  // Fetch and render the search results.
  // TODO: Look at using async/await for this.
  search(searchTerm)
    .then((results) => {
      for (var i = 0; i < results.length; i++) {
        resultsList.appendChild(
          FileListItem(results[i].fullName, results[i]));
      }
    });

  return container;
};