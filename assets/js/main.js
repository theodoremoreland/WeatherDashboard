import { extractWeatherData } from "./scripts/fetchWeatherData.js";
import { validateSearchValue } from "./scripts/validateSearchValue.js";
import { updateSearchHistory } from "./scripts/updateSearchHistory.js";
import { displayCurrentWeather } from "./scripts/displayCurrentWeather.js";
import { displayForecast } from "./scripts/displayForcast.js";
import { displaySearchHistory } from "./scripts/displaySearchHistory.js";

const bodyElement = document.querySelector("body");
const currentWeatherContainer = document.querySelector(".currentWeather");
const forecastWeatherContainer = document.querySelector(".weatherForecast");
const searchHistoryContainer = document.querySelector(".history"); // ul element for appended historic search values

displaySearchHistory(searchHistoryContainer);

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
    else if (target.matches("button")) {
        const searchValue = document.querySelector("input").value.trim();

        if (validateSearchValue(searchValue)) {
            submitSearch(searchValue);
        }
    }
}

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
        .catch(e => console.error(e))
        ;
    
}

bodyElement.addEventListener("click", handleClick);