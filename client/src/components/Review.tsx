import React from "react";

type Props = {
  review: {
    content: string;
    createdAt: string;
  };
};

const Review = ({ review }: Props): JSX.Element => {
  const formatDate: (date: string) => string = (date) => {
    const day = date.split("T")[0];
    const time = date.split("T")[1].slice(0, 5);
    return "On " + day + " at " + time;
  };

  return (
    <div>
      <p>{review.content}</p>
      <p>{formatDate(review.createdAt)}</p>
    </div>
  );
};

export default Review;
