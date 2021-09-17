import { extractWeatherData } from "./scripts/fetchWeatherData.js";

extractWeatherData("Dallas", "TX", "USA")
    .then(data => console.log(data));