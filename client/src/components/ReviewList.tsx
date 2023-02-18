import Review from "./Review";
import React from "react";

type Props = {
  reviews: Array<{
    content: string;
    createdAt: string;
    _id: string;
  }>;
};

const ReviewList = ({ reviews }: Props) => {
  const getReviews = (): JSX.Element[] => {
    return reviews.map((review) => {
      return (
        <li key={review._id} className="list-group-item">
          <Review review={review} />
        </li>
      );
    });
  };

  return <ul className="list-group">{getReviews()}</ul>;
};
export default ReviewList;
