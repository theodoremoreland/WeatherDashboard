
export const displaySearchHistory = (parentElement) => {
    parentElement.innerHTML = "";

    const searchHistory = JSON.parse(localStorage.getItem("history")) || {};

    for (const searchValue of Object.values(searchHistory)) {
        const li = document.createElement("li");
        li.textContent = searchValue;
        parentElement.appendChild(li);
    }
}