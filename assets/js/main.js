import { extractWeatherData } from "./scripts/fetchWeatherData.js";

const formElement = document.querySelector("form");

const submitSearch = async (event) => {
    event.preventDefault();

    const searchValue = document.querySelector("input").value;
    const [city, stateCode, countryCode] = searchValue.split(",");

    await extractWeatherData(city, stateCode.trim(), countryCode.trim())
        .then(data => console.log(data))
        .catch(e => console.error(e))
        ;
}

formElement.addEventListener("submit", submitSearch);