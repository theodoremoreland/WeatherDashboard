/**
 * Appends each value in search history to provided ul element
 * @param {Node} ulElement - Parent ul element to be appended to.
 */
export const displaySearchHistory = (ulElement) => {
    ulElement.innerHTML = "";
    
    const searchHistory = JSON.parse(localStorage.getItem("history")) || [];

    if (searchHistory.length > 0) {
        for (const searchValue of searchHistory) {
            const li = document.createElement("li");
            li.classList.add("historicSearchValue");
            li.textContent = searchValue;
            li.dataset.searchValue = searchValue;
            ulElement.appendChild(li);
        }
    }
    else {
        const p = document.createElement("p");

        p.textContent = "No search history";
        p.classList.add("defaultSearchValue");
        ulElement.appendChild(p);
    }
}