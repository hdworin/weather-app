import React, {FC, useState} from "react";
import { WeatherLocation } from "../model/Weather";

interface LocationSearchProps {
  onSearch: (search: string) => void;
}

export const LocationSearch: FC<LocationSearchProps> = ({onSearch}) => {
  const [locationSearch, setLocationSearch] = useState('');

  const disableSearch = locationSearch.trim() === '';

  const addLocation = () => {
    onSearch(locationSearch);
    setLocationSearch('');
  };

  return (
    <div>
      <label>
        Add Location or Zipcode
        <input className="ml-1 mr-1" type="text" value={locationSearch}
               onChange={e => setLocationSearch(e.target.value)}/>
      </label>
      <button className="btn btn-primary"
              onClick={addLocation} disabled={disableSearch}>Search</button>
    </div>
  );
}

