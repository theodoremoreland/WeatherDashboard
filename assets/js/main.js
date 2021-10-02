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
const searchHistoryContainer = document.querySelector(".history"); // ul element for appended historic search values

displaySearchHistory(searchHistoryContainer);

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
        const searchValue = document.querySelector("input").value.trim();
        document.querySelector("input").value = "";

        if (validateSearchValue(searchValue)) {
            submitSearch(searchValue);
        }
    }
    else if (target.matches("#clearHistoryButton")) {
        clearSearchHistory();
        displaySearchHistory(searchHistoryContainer);
    }
    else if (target.matches("#menuIcon") || target.matches("#closeWindowIcon")) {
        const menuElement = document.querySelector("aside");
        const menuIsOpen = menuElement.dataset.open === "true" ? true : false;

        if (!menuIsOpen) {
            menuElement.style.display = "flex";
            menuElement.dataset.open = "true";
        }
        else {
            menuElement.style.display = "none";
            menuElement.dataset.open = "false";
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

    await extractWeatherData(city, stateCode, countryCode)
        .then(weatherData => {
            forecastWeatherContainer.innerHTML = "";

            displayCurrentWeather(currentWeatherContainer, weatherData.current);

            for (const forecast of weatherData.forecast) {
                displayForecast(forecastWeatherContainer, forecast);
            }

            updateSearchHistory(searchValue, searchHistoryContainer);
        })
        .catch(e => alert(e))
        ;
    
}

bodyElement.addEventListener("click", handleClick);