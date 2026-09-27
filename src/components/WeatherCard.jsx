function WeatherCard({ weather }) {
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="weather-card">
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        className="weather-icon"
      />

      <h1>{Math.round(weather.main.temp)}°C</h1>

      <p className="weather-condition">
        {weather.weather[0].description}
      </p>

      <div className="weather-details">
        <div>
          <strong>💧 Humidity</strong>
          <p>{weather.main.humidity}%</p>
        </div>

        <div>
          <strong>💨 Wind</strong>
          <p>{weather.wind.speed} m/s</p>
        </div>

        <div>
          <strong>🌅 Sunrise</strong>
          <p>{sunrise}</p>
        </div>

        <div>
          <strong>🌇 Sunset</strong>
          <p>{sunset}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;