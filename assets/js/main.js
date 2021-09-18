import { extractWeatherData } from "./scripts/fetchWeatherData.js";
import { displayCurrentWeather } from "./scripts/displayCurrentWeather.js";
import { displayForecast } from "./scripts/displayForcast.js";

const formElement = document.querySelector("form");
const currentWeatherContainer = document.querySelector(".currentWeather");
const forecastWeatherContainer = document.querySelector(".weatherForecast");

const submitSearch = async (event) => {
    event.preventDefault();

    const searchValue = document.querySelector("input").value;
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
            
        })
        .catch(e => console.error(e))
        ;
    
}

formElement.addEventListener("submit", submitSearch);