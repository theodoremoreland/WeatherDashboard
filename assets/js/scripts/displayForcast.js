/**
 * Scrambles order of children nodes based on length of grandparent then appends to parent. 
 * @param {Node} grandparent - Node that parent will be appended to.
 * @param {Node} parent - Node that children will be appended to.
 * @param {Array<Node>} children - Array of Nodes to be scrambled before appending.
 */
const scrambleThenAppendChildren = (grandparent, parent, children) => {
    const currentNumberOfChildren = grandparent.children.length;
    const [child1, child2, child3] = children;
    let scrabbledChildren

    if (currentNumberOfChildren % 5 === 0) {
        scrabbledChildren = [child1, child2, child3];
    }
    else if (currentNumberOfChildren % 4 === 0) {
        scrabbledChildren = [child2, child3, child1];
    }
    else if (currentNumberOfChildren % 3 === 0) {
        scrabbledChildren = [child3, child1, child2];
    }
    else if (currentNumberOfChildren % 2 === 0) {
        scrabbledChildren = [child2, child3, child1];
    }
    else if (currentNumberOfChildren % 1 === 0) {
        scrabbledChildren = [child3, child1, child2];
    }

    for (const child of scrabbledChildren) {
        parent.appendChild(child);
    }
}


/**
 * Adds forecast weather elements and data to DOM
 * @param {Node} currentWeatherContainer - DOM node to add weather data and elements.
 * @param {Object} data - Data object, including name, date, uvi, temp, feelsLike, windSpeed, humidity weatherIcon, and description.
 */
export const displayForecast = (forecastWeatherContainer, { name, date, uvi, temp, feelsLike, windSpeed, humidity, weatherIcon, description }) => {
    if (!name || !date) {
        return;
    }

    const forecastWrapperElement = document.createElement("div");

    // meta container
    const metaContainer = document.createElement("div");

    const humidityContainer = document.createElement("div");
    const humidityIcon = document.createElement("i");
    const humidityParagraph = document.createElement("p");
    const humidityHeader = document.createElement("h3");

    humidityIcon.classList.add("fas", "fa-tint");
    humidityParagraph.textContent = `${humidity}%`;
    humidityHeader.textContent = `Humidity`;

    humidityContainer.appendChild(humidityIcon);
    humidityContainer.appendChild(humidityParagraph);
    humidityContainer.appendChild(humidityHeader);

    const windSpeedContainer = document.createElement("div");
    const windSpeedIcon = document.createElement("i");
    const windSpeedHeader = document.createElement("h3");
    const windSpeedParagraph = document.createElement("p");

    windSpeedIcon.classList.add("fas", "fa-wind");
    windSpeedParagraph.textContent = `${windSpeed}mph`;
    windSpeedHeader.textContent = `Wind Speed`;

    windSpeedContainer.appendChild(windSpeedIcon);
    windSpeedContainer.appendChild(windSpeedParagraph);
    windSpeedContainer.appendChild(windSpeedHeader);

    const feelsLikeContainer = document.createElement("div");
    const feelsLikeIcon = document.createElement("i");
    const feelsLikeHeader = document.createElement("h3");
    const feelsLikeParagraph = document.createElement("p");

    feelsLikeIcon.classList.add("fas", "fa-thermometer-half");
    feelsLikeHeader.textContent = `${feelsLike}d`;
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
    const weatherIconElement = document.createElement("img");
    const weatherParagraph = document.createElement("p");

    weatherIconElement.classList.add("weatherIcon");
    weatherIconElement.src = weatherIcon;
    weatherParagraph.textContent = description;

    weatherIconContainer.classList.add("icon");
    weatherIconContainer.appendChild(weatherIconElement);
    weatherIconContainer.appendChild(weatherParagraph);

    // temp container
    const tempContainer = document.createElement("div");
    const tempHeader = document.createElement("h3");
    const dateParagraph = document.createElement("p");
    const cityParagraph = document.createElement("p");

    tempHeader.textContent = `${temp}d`;
    cityParagraph.textContent = name;
    dateParagraph.textContent = date;

    tempContainer.classList.add("temp");
    tempContainer.appendChild(tempHeader);
    tempContainer.appendChild(cityParagraph);
    tempContainer.appendChild(dateParagraph);

    // end
    forecastWrapperElement.classList.add("forecast");

    scrambleThenAppendChildren(forecastWeatherContainer, forecastWrapperElement, [metaContainer, weatherIconContainer, tempContainer]);

    forecastWeatherContainer.appendChild(forecastWrapperElement);
}