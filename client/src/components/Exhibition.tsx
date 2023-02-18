import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExhibitionDataService from "../services/ExhibitionDataService";
import ReviewDataService from "../services/ReviewDataService";
import ExhibitionsList from "./ExhibitionList";
import ReviewList from "./ReviewList";

const Exhibition = () => {
  const params = useParams();
  const [exhibition, setExhibition] = useState({ title: "" });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const exhibitionData = (await ExhibitionDataService.getById(params.id))
        .data;

      setExhibition(exhibitionData);

      const reviewsData = (
        await ReviewDataService.getAllByExhibitionId(exhibitionData._id)
      ).data;

      setReviews(reviewsData);
    };

    fetchData().catch((e) => console.log(e));
  }, [params]);

  return (
    <div>
      <div>
        <h5>{exhibition.title}</h5>
        <ReviewList reviews={reviews} />
      </div>
      <br></br>
      <div>
        <h5>Other exhibitions:</h5>
        <ExhibitionsList />
      </div>
    </div>
  );
};
export default Exhibition;
