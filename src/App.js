import "./App.css";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { GEO_URL, API_KEY, SEARCH_NAME_URL } from "./constants";
import {WeatherUi} from "./weatherUi";

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [searchdata, setSearchdata] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [Loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setErrorMsg("");
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
  
      await fetch(`${GEO_URL}${lat};${long}/?token=${API_KEY}`)
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          setWeatherData([result.data]);
        });
    };

    fetchData();
  }, [lat, long]);

  const search = async (event) => {
    if (event.key === "Enter") {
      fetchweather(searchdata);
    }
  };

  const fetchweather = async (cityname) => {
    setLoading(true);
    await fetch(`${SEARCH_NAME_URL}${cityname}/?token=${API_KEY}`)
      .then((res) => res.json())
      .then((result) => {
        setSearchdata("");
        if (result && result.status === "ok") {
          setLoading(false);
          setErrorMsg("");
          setWeatherData([result.data]);
        } else {
           setLoading(false);
          setErrorMsg("Please enter the valid city name!");
        }
      });
  };

  return (
    <div className="main-container-background">
      {Loading ? (
        <ReactLoading
          type={"spinningBubbles"}
          color={"white"}
          height={"20%"}
          width={"20%"}
          className="loader"
        />
      ) : (
        <div className="main-container">
          <input
            type="text"
            className="search"
            placeholder="Enter the city name in here"
            value={searchdata}
            onChange={(event) => setSearchdata(event.target.value)}
            onKeyPress={search}
          />
          {errorMsg && <div className="errorMsg"> {errorMsg} </div>}
          <WeatherUi weatherData={weatherData} />
        </div>
      )}
    </div>
  );
}
