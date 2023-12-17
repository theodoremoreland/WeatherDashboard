const weatherIconURL = "http://openweathermap.org/img/wn/";
const apiKey = "9608ba5f1ed8baf0a21f603a93d58b5a";

/**
 * Return a Promise object with name and coordinates (lat, lon) for given city.
 * @param {String} city - The name of the city.
 * @param {String} stateCode - State abbreviation (US only) https://www.nrcs.usda.gov/wps/portal/nrcs/detail/tx/home/?cid=nrcs143_013696.country
 * @param {String} countryCode - Country code e.g. United States = USA. https://countrycode.org/.
 */
export const fetchCoordinates = async (city, stateCode, countryCode) => {
  const stateCodeParam = stateCode ? `,${stateCode}` : "";
  const countryCodeParam = countryCode ? `,${countryCode}` : "";
  const endpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${city}${stateCodeParam}${countryCodeParam}&limit=1&appid=${apiKey}`;
  const response = await fetch(endpoint);
  const data = await response.json();

  return {
    name: data[0].name,
    lat: data[0].lat,
    lon: data[0].lon,
  };
};

/**
 * Return a Promise object with name, date, uvi, temp, humidity, windSpeed, feelsLike, and weatherIcon for the current date + 7 days for given city.
 * @param {String} city - The employee who is responsible for the project.
 * @param {String} stateCode - State abbreviation (US only) https://www.nrcs.usda.gov/wps/portal/nrcs/detail/tx/home/?cid=nrcs143_013696.country
 * @param {String} countryCode - Country code e.g. United States = USA. https://countrycode.org/.
 */
export const extractWeatherData = async (city, stateCode, countryCode) => {
  const weather = { current: {}, forecast: [] };
  const nameLatLon = await fetchCoordinates(city, stateCode, countryCode);
  const name = nameLatLon.name;
  const lat = nameLatLon.lat;
  const lon = nameLatLon.lon;

  if (name === "TypeError" || !lat || !lon) {
    throw new Error(`Could not find weather data for "${city}"`);
  }

  const weatherPromise = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  );

  const data = await weatherPromise.json();
  const date = new Date().toDateString();
  const uvi = data.current.uvi;
  const temp = data.current.temp;
  const humidity = data.current.humidity;
  const windSpeed = data.current.wind_speed;
  const feelsLike = data.current.feels_like;
  const weatherIcon = weatherIconURL + data.current.weather[0].icon + "@2x.png";
  const description = data.current.weather[0].main;
  const forecast = data.daily.splice(1).map((day) => ({
    name,
    date: new Date(day.dt * 1000).toDateString(),
    uvi: day.uvi,
    temp: day.temp.day,
    humidity: day.humidity,
    windSpeed: day.wind_speed,
    feelsLike: day.feels_like.day,
    weatherIcon: weatherIconURL + day.weather[0].icon + "@2x.png",
    description: day.weather[0].main,
  }));

  const current = {
    name,
    date,
    uvi,
    temp,
    humidity,
    windSpeed,
    feelsLike,
    weatherIcon,
    description,
  };

  weather.forecast.push(...forecast);
  weather.current = current;

  return weather;
};
