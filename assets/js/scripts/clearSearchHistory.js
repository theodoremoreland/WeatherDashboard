/**
 * Clears search history
 */
export const clearSearchHistory = () => {
    localStorage.setItem("history",  "[]");
}