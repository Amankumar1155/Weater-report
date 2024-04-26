// App.js

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const apiKey = "7edb7da774621ca7b60b3db49b774e26";
  const [inputCity, setInputCity] = useState("");
  const [weatherData, setWeatherData] = useState({});

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setWeatherData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className="heading">Weather Report Update</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            value={inputCity}
            onChange={handleChangeInput}
          />
          <button className="btn btn-primary" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {Object.keys(weatherData).length > 0 && (
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded weatherResultBox">
            <img
              className="weatherIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
              alt="weather icon"
            />
            <h5 className="weatherCity">{weatherData?.name}</h5>
            <h6 className="weatherTemp">
              {((weatherData?.main?.temp) - 273.15).toFixed(2)}°C
            </h6>
            <p>Humidity: {weatherData?.main?.humidity}%</p>
            <p>Wind Speed: {weatherData?.wind?.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
