/**
 * Appends each value in search history to provided ul element
 * @param {Node[]} ulElements - Parent ul elements to be appended to in an array.
 * @returns {void}
 */
export const displaySearchHistory = (ulElements) => {
    ulElements.forEach((ulElement) => {
        ulElement.innerHTML = "";
    
        const searchHistory = JSON.parse(localStorage.getItem("history")) || [];
    
        if (searchHistory.length > 0) {
            for (const searchValue of searchHistory) {
                const li = document.createElement("li");
                const img = document.createElement("img");
                const p = document.createElement("p");
    
                img.src = "assets/images/cloud.svg";
                p.textContent = searchValue;
                li.dataset.searchValue = searchValue;
                li.classList.add("historicSearchValue");
    
                li.appendChild(p);
                li.appendChild(img);
                ulElement.appendChild(li);
            }
        }
        else {
            const p = document.createElement("p");
    
            p.textContent = "No search history";
            p.classList.add("defaultSearchValue");
            ulElement.appendChild(p);
        }
    });
}