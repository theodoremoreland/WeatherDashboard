/**
 * Appends each value in search history to provided ul element
 * @param {Node} ulElement - Parent ul element to be appended to.
 */
export const displaySearchHistory = (ulElement) => {
    ulElement.innerHTML = "";

    const searchHistory = JSON.parse(localStorage.getItem("history")) || [];

    for (const searchValue of searchHistory) {
        const li = document.createElement("li");
        li.classList.add("historicSearchValue");
        li.textContent = searchValue;
        ulElement.appendChild(li);
    }
}