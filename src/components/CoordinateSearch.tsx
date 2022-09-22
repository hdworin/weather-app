import React, { FC, useState } from "react";
import { WeatherLocation } from "../model/Weather";

interface CoordinateProps {
  onSearchCoordinates: (lat: string, lon: string) => void;
  //  latitude: string,
  //  longitude: string
}



export const CoordinateSearch: FC<CoordinateProps> = ({ onSearchCoordinates }) => {
  const [latitudeSearch, setLatitudeSearch] = useState('');
  const [longitudeSearch, setLongitudeSearch] = useState('');

  const addCoordinates = () => {
    onSearchCoordinates(latitudeSearch, longitudeSearch);
    setLatitudeSearch('');
    setLongitudeSearch('');
    ;
  };


  return (
    <div>
      <label>
        Add Latitude
        <input
          className="ml-1 mr-1"
          type="text"
          value={latitudeSearch}
          onChange={e => setLatitudeSearch(e.target.value)}
          name="latitude"
        />
      </label>
      <label>
        Add Longitude
        <input
          className="ml-1 mr-1"
          type="text"
          value={longitudeSearch}
          onChange={e => setLongitudeSearch(e.target.value)}
          name="longitude"
        />
      </label>
      <label>Leave Blank for Geolocation</label>
      <button
        className="btn btn-primary"
        onClick={addCoordinates}>Search</button>

    </div>
  );
}

