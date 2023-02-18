import { useEffect, useState } from "react";
import Select from "react-select";
import ExhibitionDataService from "../services/ExhibitionDataService";

// How to use TS with react-select? https://react-select.com/typescript

const ExhibitionSelect = ({ setExhibition }) => {
  const [exhibitionOptions, setExhibitionOptions] = useState([]);

  useEffect(() => {
    ExhibitionDataService.getAll()
      .then((response) => {
        setExhibitionOptions(getExhibitionOptions(response.data));
      })
      .catch((e) => console.log(e));
  }, []);

  const onChangeExhibition = (e) => {
    setExhibition(e.target.value);
  };

  const getExhibitionOptions = (exhibitions) => {
    return exhibitions.map((exhibition) => {
      return {
        value: exhibition._id,
        label: exhibition.title,
      };
    });
  };

  return (
    <>
      <Select
        value={exhibitionOptions.value}
        options={exhibitionOptions}
        onChange={onChangeExhibition}
      />
    </>
  );
};

export default ExhibitionSelect;
