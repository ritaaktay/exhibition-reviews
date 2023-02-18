import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExhibitionDataService from "../services/ExhibitionDataService";
import React from "react";

const ExhibitionsList = (): JSX.Element => {
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const exhibitionsData = (await ExhibitionDataService.getAll()).data;
      setExhibitions(exhibitionsData);
    };

    fetchData().catch((e) => console.log(e));
  }, []);

  const getExhibitions = (): JSX.Element[] => {
    return exhibitions.map((exhibition: { _id: string; title: string }) => {
      return (
        <li className="list-group-item" key={exhibition._id}>
          <Link to={`/exhibitions/${exhibition._id}`}>{exhibition.title} </Link>
        </li>
      );
    });
  };

  return <ul className="list-group">{getExhibitions()}</ul>;
};

export default ExhibitionsList;
