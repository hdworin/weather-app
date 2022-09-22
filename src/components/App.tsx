
import React, { FC, useState } from 'react';
import './App.css';
import { LocationSearch } from "./LocationSearch";
import { CoordinateSearch } from "./CoordinateSearch";
import { WeatherLocation } from "../model/Weather";
import { searchLocation, searchZipcode, searchCoordinates } from "../services/WeatherService";
import { ErrorAlert, WarningAlert } from "./Alerts";
import { WeatherSummary } from './WeatherSummary';

const App: FC = () => {
  const [currentLocation, setCurrentLocation] = useState<WeatherLocation | null>(null);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const resetAlerts = () => {
    setError('');
    setWarning('');
  }


  let addLocation = async (term: string) => {
    resetAlerts();
    let location = null;
    if (term.match(/^[0-9]+$/) != null) {
      location = await searchZipcode(term);
      // Zip code search returnd id 0 for location so extracting longitude and latitude to make call 
      location = await searchCoordinates(location!.coord.lat.toString(), location!.coord.lon.toString())
    } else {
      location = await searchLocation(term);
    }

    if (!location) {
      setError(`No location found called '${term}'`);
    } else {
      setCurrentLocation(location);
    }
  };

  let addLocationByCoordinates = async (lat: string, long: string) => {
    resetAlerts();
    
    if (!lat && !long) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position: GeolocationPosition) => {
          lat = position.coords.latitude.toString();
          long = position.coords.longitude.toString();
          let location = await searchCoordinates(lat, long);
          if (!location) {
            setError(`No location found called '${lat}' and '${long}'`);
          }
          else {
            setCurrentLocation(location);
          }
        });
      }
    } else {
      let location = await searchCoordinates(lat, long);
      console.log(location)
      if (!location) {
        setError(`No location found called '${lat}' and '${long}'`);
      }
      else {
        setCurrentLocation(location);
      }
    }
    


  };

  return (
    <div className="container">
      <h1>Weather App</h1>

      <LocationSearch onSearch={addLocation} />
      <CoordinateSearch onSearchCoordinates={addLocationByCoordinates} />
      <ErrorAlert message={error} />
      <WarningAlert message={warning} />
      <WeatherSummary location={currentLocation} />
    </div>
  );
};

export default App;