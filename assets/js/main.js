import { extractWeatherData } from "./scripts/fetchWeatherData.js";
import { displayCurrentWeather } from "./scripts/displayCurrentWeather.js";

const formElement = document.querySelector("form");
const currentWeatherContainer = document.querySelector(".currentWeather");

const submitSearch = async (event) => {
    event.preventDefault();

    let weatherData;
    
    const searchValue = document.querySelector("input").value;
    const [city, stateCode, countryCode] = searchValue.split(",");

    await extractWeatherData(city, stateCode.trim(), countryCode.trim())
        .then(data => {
            displayCurrentWeather(currentWeatherContainer, data[0]);
        })
        .catch(e => console.error(e))
        ;
    
}

formElement.addEventListener("submit", submitSearch);