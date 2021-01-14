import { search } from "../api/api.js";
import { FileListItem } from "./fileListItem.js";

export const SearchResults = (id, searchTerm) => {
  const container = document.createElement("div");
  container.id = id;
  const resultsList = document.createElement("ul");
  container.appendChild(resultsList);

  search(searchTerm)
    .then((results) => {
      for (var i = 0; i < results.length; i++) {
        resultsList.appendChild(
          FileListItem(results[i].fullName, results[i]));
      }
    });

  return container;
};