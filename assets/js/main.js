import { extractWeatherData } from "./scripts/fetchWeatherData.js";

extractWeatherData()
    .then(data => console.log(data));