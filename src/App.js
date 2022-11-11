import React, { useState, useEffect } from "react";
import axios from "axios";
import { EventList } from "../src/EventList";
import "./app.css"
function App() {
  var gapi = window.gapi;
  var API_KEY = "AIzaSyDjOmUfOFphy62WfxzbK4sZWabX5mC6a2A";
  var CLIENT_ID =
    "289358638150-bhonr4g2buq9tftbbss39cqbofc9duag.apps.googleusercontent.com";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const [allEvents, setEvents] = useState([]);
  const [weather, setWeather] = useState([]);
  const [locations, setLocations] = useState([]);

  const url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}`;
  const handleClick = () => {
    gapi.load("client:auth2", () => {
      console.log("load client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
        plugin_name: "Weather-app",
      });

      gapi.client.load("calendar", "v3", () => console.log("bom"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          gapi.client.calendar.events
            .list({
              calendarId: "primary",
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: "startTime",
            })
            .then((response) => {
              const events = response.result.items;
              const eventLocation = events.location
              setLocations(eventLocation)
              setEvents(events);
              console.log("Events: ", events);
              console.log("All Events: ", allEvents);
              console.log("Events Location: ", eventLocation);
            });
        });     
    });
  };

  const handleClickAddEvent = () => {
    gapi.load("client:auth2", () => {
      console.log("load client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
        plugin_name: "Weather-app",
      });

      gapi.client.load("calendar", "v3", () => console.log("bom"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: "Google I/O 2015",
            location: "800 Howard St., San Francisco, CA 94103",
            description:
              "A chance to hear more about Google's developer products.",
            start: {
              dateTime: "2022-11-28T09:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            end: {
              dateTime: "2022-11-28T17:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            attendees: [
              { email: "lpage@example.com" },
              { email: "sbrin@example.com" },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            window.open(event.htmlLink);
          });
        });
    });
  };

  const getWeatherApi = ()=>{
    
  }

  

  return (
    <>
      <div className="container">
        <div className="btn-container">

        <button className="btn btn-1" onClick={handleClick}>Get Event</button>
        <button className="btn  btn-2" onClick={handleClickAddEvent}>Add Event</button>
      
        </div>
        <EventList events={allEvents} />
      </div>
    </>
  );
}

export default App;
