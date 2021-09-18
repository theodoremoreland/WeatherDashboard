import { displaySearchHistory } from "./displaySearchHistory.js";

/**
 * Saves the provided string value to local storage then displays updated history.
 * @param {String} searchValue - The employee who is responsible for the project.
 * @param {Node} ulElement - Parent ul element to be appended to.
 */
export const updateSearchHistory = (searchValue, ulElement) => {
    const currentSearchHistory = JSON.parse(localStorage.getItem("history")) || [];

    let updatedSearchHistory = new Set([...currentSearchHistory, searchValue]);
    updatedSearchHistory = [...updatedSearchHistory];

    localStorage.setItem("history", JSON.stringify(updatedSearchHistory));

    displaySearchHistory(ulElement);
}