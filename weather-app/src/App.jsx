import React, { useState } from "react";
import "./App.css";
import { API_KEY } from "./config";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const searchWeather = async () => {
    if (city.trim() === "") {
      setError("Please enter a city name");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        setError("City not found!");
        setWeather(null);
        return;
      }

      setWeather(data);

    } catch (error) {
      setError("Unable to fetch weather data");
    }
  };

  const getIcon = (main, description) => {
    if (main === "Clear") return "☀️";

    if (main === "Clouds") {
      if (description.includes("few clouds")) return "🌤️";
      if (description.includes("scattered clouds")) return "🌥️";
      return "☁️";
    }

    if (main === "Rain") return "🌧️";
    if (main === "Drizzle") return "🌦️";
    if (main === "Thunderstorm") return "⛈️";
    if (main === "Snow") return "❄️";

    if (
      main === "Mist" ||
      main === "Fog" ||
      main === "Haze" ||
      main === "Smoke" ||
      main === "Dust" ||
      main === "Sand" ||
      main === "Ash"
    ) {
      return "🌫️";
    }

    if (main === "Squall") return "💨";
    if (main === "Tornado") return "🌪️";

    return "🌤️";
  };

  return (
    <div className="app">

      <h1>Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchWeather();
          }}
        />

        <button onClick={searchWeather}>
          Search
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">

          <h2>{weather.name}, {weather.sys.country}</h2>

          <div className="weather-icon">
            {getIcon(
              weather.weather[0].main,
              weather.weather[0].description
            )}
          </div>

          <h3 className="condition">
            {weather.weather[0].description}
          </h3>

          <h1 className="temperature">
            {Math.round(weather.main.temp)}°C
          </h1>

          <div className="details">

            <div>
              <h3>💧</h3>
              <p>Humidity</p>
              <h3>{weather.main.humidity}%</h3>
            </div>

            <div>
              <h3>💨</h3>
              <p>Wind Speed</p>
              <h3>{weather.wind.speed} m/s</h3>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;
