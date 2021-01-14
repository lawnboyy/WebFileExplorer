import { Button } from "./button.js";



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