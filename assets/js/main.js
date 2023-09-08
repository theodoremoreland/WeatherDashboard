import { extractWeatherData } from "./scripts/fetchWeatherData.js";
import { validateSearchValue } from "./scripts/validateSearchValue.js";
import { updateSearchHistory } from "./scripts/updateSearchHistory.js";
import { clearSearchHistory } from "./scripts/clearSearchHistory.js";
import { displayCurrentWeather } from "./scripts/displayCurrentWeather.js";
import { displayForecast } from "./scripts/displayForecast.js";
import { displaySearchHistory } from "./scripts/displaySearchHistory.js";

const bodyElement = document.querySelector("body");
const currentWeatherContainer = document.querySelector(".currentWeather");
const forecastWeatherContainer = document.querySelector(".forecasts");
const searchHistoryContainers = document.querySelectorAll(".history"); // ul element for appended historic search values

displaySearchHistory(searchHistoryContainers);

/**
 * Handles click event then acquires searchValue from appropriate target before submitting search
 * or clears search history or opens / closes menu for mobile devices.
 * @param {Event} event - Click Event object
 */
const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const target = event.target;

    if (target.matches("li")) {
        const searchValue = target.dataset.searchValue.trim();

        if (validateSearchValue(searchValue)) {
            submitSearch(searchValue);
        }
    }
    else if (target.matches("#searchButton")) {
        // Grabs references to input for both menus.
        const mobileSearchInputElement = document.querySelector("#mobile-menu #search");
        const desktopSearchInputElement = document.querySelector("#desktop-menu #search");
        // Determines which search input was used, defaults to desktop menu's if neither.
        const searchInputElement = mobileSearchInputElement?.value ? mobileSearchInputElement : desktopSearchInputElement;
        const searchValue = searchInputElement?.value.trim();

        if (!searchInputElement) {
            const errorMessage = 'Could not find value for search term.';

            console.error(errorMessage);
            alert(errorMessage);

            return;
        }

        searchInputElement.value = "";

        if (validateSearchValue(searchValue)) {
            submitSearch(searchValue);
        }
    }
    else if (target.matches("#clearHistoryButton")) {
        clearSearchHistory();
        displaySearchHistory(searchHistoryContainers);
    }
    else if (target.matches("#menuIcon") || target.matches("#closeWindowIcon")) {
        const menuElement = document.querySelector("#mobile-menu");
        const menuIsOpen = menuElement.dataset.open === "true" ? true : false;

        if (menuIsOpen) {
            // If menu is open, close menu.
            menuElement.style.display = "none";
            menuElement.dataset.open = "false";
            
        } else {
            // Else, open menu.
            menuElement.style.display = "flex";
            menuElement.dataset.open = "true";
        }
    }
}

/**
 * Submits search then displays results
 * @param {String} searchValue - The value for the user's requested search.
 */
const submitSearch = async (searchValue) => {
    let [city, stateCode, countryCode] = searchValue.split(",");

    stateCode = stateCode ? stateCode.trim() : undefined;
    countryCode = countryCode ? countryCode.trim() : undefined;

    try {
        const weatherData = await extractWeatherData(city, stateCode, countryCode)
        
        forecastWeatherContainer.innerHTML = "";
    
        displayCurrentWeather(currentWeatherContainer, weatherData.current);
    
        for (const forecast of weatherData.forecast) {
            displayForecast(forecastWeatherContainer, forecast);
        }
    
        updateSearchHistory(searchValue, searchHistoryContainers);
    } catch (e) {
        alert(e);
    }
}

bodyElement.addEventListener("click", handleClick);