import "./App.css";
import React from "react";
import { TODAY } from "./constants";

export const WeatherUi = React.memo((props) => {
  const { weatherData } = props;
  const OzoneData = weatherData[0].forecast.daily.o3.find((obj) => {
    return obj.day === TODAY;
  });

  return (
    <>
      {weatherData.length > 0 &&
        weatherData.map((item, i) => (
          <div className="weather-container" key={i}>
            <table>
              <tbody>
                <tr>
                  <td>Latitude</td>
                  <td className="weather-details">{item.city.geo[0]}</td>
                </tr>
                <tr>
                  <td>Longitude</td>
                  <td className="weather-details">{item.city.geo[1]}</td>
                </tr>
                <tr>
                  <td>AQI</td>
                  <td className="weather-details">{item.aqi}</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td className="weather-details">{item.city.name}</td>
                </tr>
                <tr>
                  <td>Weather Station</td>
                  <td className="weather-details">
                    {item.attributions[0].name}
                  </td>
                </tr>
                <tr>
                  <td>O3 Avg</td>
                  <td>{OzoneData.avg}</td>
                </tr>
                <tr>
                  <td>O3 Max</td>
                  <td>{OzoneData.max}</td>
                </tr>
                <tr>
                  <td>O3 Min</td>
                  <td>{OzoneData.min}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
    </>
  );
});

