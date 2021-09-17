/**
 * Adds currentWeather elements and data to DOM
 * @param {Node} currentWeatherContainer - DOM node to add weather data and elements.
 * @param {Object} data - Data object, including name, date, uvi, temp, windSpeed, humidity and weatherIcon.
 */
export const displayCurrentWeather = (currentWeatherContainer, { name, date, uvi, temp, windSpeed, humidity, weatherIcon }) => {
    currentWeatherContainer.innerHTML = "";

    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");

    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");

    const cityHeader = document.createElement("h2");
    const dateParagraph = document.createElement("p");
    const uvLabelParagraph = document.createElement("p");
    const uvValueParagraph = document.createElement("p");

    cityHeader.textContent = `${name}`;
    dateParagraph.textContent = `${date}`;
    cityHeader.setAttribute("class", "city");
    dateParagraph.setAttribute("class", "date");

    div1.appendChild(cityHeader);
    div1.appendChild(dateParagraph);

    uvLabelParagraph.textContent = `UV Index`;
    uvValueParagraph.textContent = `${uvi}`;
    uvLabelParagraph.setAttribute("class", "uvLabel");
    uvValueParagraph.setAttribute("class", "uvValue");

    div2.appendChild(uvLabelParagraph);
    div2.appendChild(uvValueParagraph);

    li1.textContent = `Temp: ${temp}`;
    li2.textContent = `Humidity: ${humidity}%`;
    li3.textContent = `Wind Speed: ${windSpeed}mph`;

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);

    div3.appendChild(ul);

    currentWeatherContainer.appendChild(div1);
    currentWeatherContainer.appendChild(div2);
    currentWeatherContainer.appendChild(div3);
};