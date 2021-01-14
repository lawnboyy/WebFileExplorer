import { search } from "../api/api.js";
import { FileListItem } from "./fileListItem.js";
import { LoadingIndicator } from "./loadingIndicator.js";

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

  // Create a loading indicator
  const loadingIndicatorId = "search-loading-div";
  const loadingIndicator = LoadingIndicator(loadingIndicatorId, "Loading search results")
  container.appendChild(loadingIndicator);

  // Fetch and render the search results.
  search(searchTerm).then((results) => {
    loadingIndicator.style = "display: none";

    if (results && results.length && results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        resultsList.appendChild(
          FileListItem(results[i].fullName, results[i]));
      }
    } else {
      alert("There were no results returned.");
    }
  });


  return container;
};