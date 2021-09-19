/**
 * Returns string representing UV level (low, medium, high, very-high, or extreme)
 * @param {Number} index - UV index
 */
export const determineUVlevel = (index) => {
    let level;

    if (index <= 2) level = "low";
    else if (index <= 5) level = "medium";
    else if (index <= 7) level = "high";
    else if (index <= 10) level = "very-high";
    else level = "extreme";

    return level;
}

/**
 * Adds currentWeather elements and data to DOM
 * @param {Node} currentWeatherContainer - DOM node to add weather data and elements.
 * @param {Object} data - Data object, including name, date, uvi, temp, windSpeed, humidity, feelsLike, weatherIcon, and description.
 */
export const displayCurrentWeather = (currentWeatherContainer, { name, date, uvi, temp, windSpeed, humidity, feelsLike, weatherIcon, description }) => {
    if (!name || !date) {
        return;
    }

    currentWeatherContainer.innerHTML = "";

    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const cityDateContainer = document.createElement("div");
    const weatherIconDescriptionContainer = document.createElement("div");

    const weatherIconElement = document.createElement("img");

    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
    const li4 = document.createElement("li");

    const cityHeader = document.createElement("h2");
    const dateParagraph = document.createElement("p");
    const descriptionParagraph = document.createElement("p");
    const uvLabelParagraph = document.createElement("p");
    const uvValueParagraph = document.createElement("p");

    cityHeader.textContent = `${name}`;
    dateParagraph.textContent = `${date}`;
    weatherIconElement.src = weatherIcon;
    descriptionParagraph.textContent = description;
    cityHeader.setAttribute("class", "city");
    dateParagraph.setAttribute("class", "date");
    descriptionParagraph.setAttribute("class", "description");

    cityDateContainer.appendChild(cityHeader);
    cityDateContainer.appendChild(dateParagraph);

    weatherIconDescriptionContainer.appendChild(weatherIconElement);
    weatherIconDescriptionContainer.appendChild(descriptionParagraph);

    div1.appendChild(cityDateContainer);
    div1.appendChild(weatherIconDescriptionContainer);

    uvLabelParagraph.textContent = `UV Index`;
    uvValueParagraph.textContent = `${uvi}`;
    uvLabelParagraph.setAttribute("class", "uvLabel");
    uvValueParagraph.setAttribute("class", "uvValue");

    div2.appendChild(uvLabelParagraph);
    div2.appendChild(uvValueParagraph);
    div2.setAttribute("class", determineUVlevel(uvi));

    li1.textContent = `Temp: ${temp}d`;
    li2.textContent = `Humidity: ${humidity}%`;
    li3.textContent = `Wind Speed: ${windSpeed}mph`;
    li4.textContent = `Feels Like: ${feelsLike}d`;

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);

    div3.appendChild(ul);

    currentWeatherContainer.appendChild(div1);
    currentWeatherContainer.appendChild(div2);
    currentWeatherContainer.appendChild(div3);
};