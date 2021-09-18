/**
 * Adds forecast weather elements and data to DOM
 * @param {Node} currentWeatherContainer - DOM node to add weather data and elements.
 * @param {Object} data - Data object, including name, date, uvi, temp, feelsLike, windSpeed, humidity and weatherIcon.
 */
export const displayForecast = (forecastWeatherContainer, { name, date, uvi, temp, feelsLike, windSpeed, humidity, weatherIcon }) => {
    forecastWeatherContainer.innerHTML = "";

    // meta container
    const metaContainer = document.createElement("div");

    const humidityContainer = document.createElement("div");
    const humidityIcon = document.createElement("i");
    const humidityParagraph = document.createElement("p");
    const humidityHeader = document.createElement("h3");

    humidityIcon.classList.add("fas", "fa-tint");
    humidityParagraph.textContent = `${humidity}`;
    humidityHeader.textContent = `Humidity`;

    humidityContainer.appendChild(humidityIcon);
    humidityContainer.appendChild(humidityParagraph);
    humidityContainer.appendChild(humidityHeader);

    const windSpeedContainer = document.createElement("div");
    const windSpeedIcon = document.createElement("i");
    const windSpeedHeader = document.createElement("h3");
    const windSpeedParagraph = document.createElement("p");

    windSpeedIcon.classList.add("fas", "fa-wind");
    windSpeedParagraph.textContent = `${windSpeed}`;
    windSpeedHeader.textContent = `Wind Speed`;

    windSpeedContainer.appendChild(windSpeedIcon);
    windSpeedContainer.appendChild(windSpeedParagraph);
    windSpeedContainer.appendChild(windSpeedHeader);

    const feelsLikeContainer = document.createElement("div");
    const feelsLikeIcon = document.createElement("i");
    const feelsLikeHeader = document.createElement("h3");
    const feelsLikeParagraph = document.createElement("p");

    feelsLikeIcon.classList.add("fas", "fa-tint");
    feelsLikeHeader.textContent = `${feelsLike}`;
    feelsLikeParagraph.textContent = `Feels Like`;

    feelsLikeContainer.appendChild(feelsLikeIcon);
    feelsLikeContainer.appendChild(feelsLikeHeader);
    feelsLikeContainer.appendChild(feelsLikeParagraph);
    
    metaContainer.classList.add("meta");
    metaContainer.appendChild(humidityContainer);
    metaContainer.appendChild(windSpeedContainer);
    metaContainer.appendChild(feelsLikeContainer);

    // weather icon container
    const weatherIconContainer = document.createElement("div");
    const weatherIconElement = document.createElement("i");
    const weatherParagraph = document.createElement("p");

    weatherIconElement.classList.add("fa", "fa-sun");
    weatherParagraph.textContent = "Sunny";

    weatherIconContainer.classList.add("icon");
    weatherIconContainer.appendChild(weatherIconElement);
    weatherIconContainer.appendChild(weatherParagraph);

    // temp container
    const tempContainer = document.createElement("div");
    const tempHeader = document.createElement("h3");
    const dateParagraph = document.createElement("p");
    const cityParagraph = document.createElement("p");

    tempHeader.textContent = temp;
    cityParagraph.textContent = name;
    dateParagraph.textContent = date;

    tempContainer.classList.add("temp");
    tempContainer.appendChild(tempHeader);
    tempContainer.appendChild(dateParagraph);
    tempContainer.appendChild(cityParagraph);

    // end
    forecastWeatherContainer.classList.add("forecast");
    forecastWeatherContainer.appendChild(metaContainer);
    forecastWeatherContainer.appendChild(weatherIconContainer);
    forecastWeatherContainer.appendChild(tempContainer);
}