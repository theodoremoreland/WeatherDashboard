const weatherIconURL = "http://openweathermap.org/img/wn/";


export const extractWeatherData = async () => {
    let weather = [];

    const weatherPromise = fetch("https://api.openweathermap.org/data/2.5/onecall?lat=32.7668&lon=-96.7836&appid=9608ba5f1ed8baf0a21f603a93d58b5a")
        .then(response => response.json())
        .then(data => data)
        .catch(e => e)
        ;

    await weatherPromise
        .then(data => {
            const date = new Date().toDateString();
            const uvi = data.current.uvi;
            const temp = data.current.temp;
            const humidity = data.current.humidity;
            const windSpeed = data.current.wind_speed;
            const feelsLike = data.current.feels_like;
            const weatherIcon = weatherIconURL + data.current.weather[0].icon + "@2x.png";
            const forecast = data.daily.splice(1).map(day =>  (
                {
                    date: new Date(day.dt * 1000).toDateString(),
                    uvi: day.uvi,
                    temp : day.temp.day,
                    humidity : day.humidity,
                    windSpeed : day.wind_speed,
                    feelsLike : day.feels_like.day,
                    weatherIcon : weatherIconURL + day.weather.icon + "@2x.png"
                }
            ));

            const current = {
                date,
                uvi,
                temp,
                humidity,
                windSpeed,
                feelsLike,
                weatherIcon
            };

            
            weather.push(current);
            weather = [...weather, ...forecast];
        })
        .catch(e => console.error(e))
        ;

    return weather;
}
