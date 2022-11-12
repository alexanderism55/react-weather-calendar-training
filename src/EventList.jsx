import React, { useState } from "react";
import "./event-list.css";
import axios from "axios";
export function EventList({ events }) {
  

    const [weather, setWeather] = useState([]);

  return (
    <div>
      {events.map((e) => (
        <div className="events" key={e.id}>
          {e.summary}
          {function getWeatherData() {
    axios
      .get(
        "https://api.tomorrow.io/v4/timelines?location=-73.98529171943665,40.75872069597532&fields=temperature&timesteps=1h&units=metric&apikey=Mm0XJsU6iRXx03vAyTJFCQ0ajnttZH1U"
      )
      .then((response) => {
        console.log("weather response: ", response);
        setWeather(response.data.data.timelines);
        console.log('weather response var: ', weather)
        console.log('weather response timelines: ', response.data.data.timelines)
      })
      .catch((err) => {
        console.log("Mission Failed");
      });
  }}
          <p>{e.location}</p>
        </div>
      ))}
    </div>
  );
}
