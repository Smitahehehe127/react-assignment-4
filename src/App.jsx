import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

   const getWeather = async (searchCity) => {
    if (!searchCity.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          searchCity
        )}&appid=${API_KEY}&units=metric`
      );

     if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.message || "Weather request failed.");
}

      const data = await response.json();

      setWeather(data);
    } catch (error) {
      setWeather(null);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    getWeather(city);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Weather Dashboard</h1>
        <p>Check the current weather of any city</p>
      </header>

      <main className="main-content">
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
        />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-message">
            {error}
          </div>
        )}

        {weather && !loading && !error && (
          <WeatherCard weather={weather} />
        )}
      </main>

      <footer className="footer">
        <p>© 2026 Weather Dashboard</p>
      </footer>
    </div>
  );
}

export default App;