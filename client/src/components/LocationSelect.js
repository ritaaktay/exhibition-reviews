import { useEffect, useState } from "react";
import Select from "react-select";
import LocationDataService from "../services/LocationDataService";

// How to use TS with react-select? https://react-select.com/typescript

const LocationSelect = ({ setLocation }) => {
  const [locationOptions, setLocationOptions] = useState([]);

  useEffect(() => {
    LocationDataService.getAll()
      .then((response) => {
        setLocationOptions(getLocationOptions(response.data));
      })
      .catch((e) => console.log(e));
  }, []);

  const getLocationOptions = (locations) => {
    return locations.map((location) => {
      return {
        value: location._id,
        label: location.location,
      };
    });
  };

  return (
    <Select
      value={locationOptions.value}
      options={locationOptions}
      onChange={setLocation}
    />
  );
};

export default LocationSelect;
