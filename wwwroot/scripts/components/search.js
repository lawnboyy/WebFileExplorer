import { Button } from "./button.js";

export const Search = (id, onSearchClicked) => {
    const searchDiv = document.createElement("div");
    searchDiv.id = id;
    const searchInput = document.createElement("input");
    searchDiv.appendChild(searchInput);
    const searchButton = Button("search-btn", "Search", onSearchClicked);
    searchDiv.appendChild(searchButton);

    return searchDiv;
};