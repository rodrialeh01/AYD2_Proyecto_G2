import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const RatingStats = ({ comments }) => {
  const totalRatings = comments.length;
  const averageRating = totalRatings > 0
    ? comments.reduce((acc, comment) => acc + comment.rating, 0) / totalRatings
    : 0;

  const countRatings = (stars) => comments.filter((comment) => comment.rating === stars).length;
  const calculatePercentage = (count) => ((count / totalRatings) * 100).toFixed(2);

  const renderStars = (rating, onClick = null) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span
            key={i}
            className="text-yellow-500 cursor-pointer text-2xl"
            onClick={() => onClick && onClick(i)}
          >
            <FaStar />
          </span>
        );
      } else if (i - rating < 1 && i - rating > 0) {
        stars.push(
          <span
            key={i}
            className="text-yellow-500 cursor-pointer text-2xl"
            onClick={() => onClick && onClick(i)}
          >
            <FaStarHalfAlt />
          </span>
        );
      } else {
        stars.push(
          <span
            key={i}
            className="text-gray-300 cursor-pointer text-2xl"
            onClick={() => onClick && onClick(i)}
          >
            <FaStar />
          </span>
        );
      }
    }
    return stars;
  };

  const renderStars2 = (rating, onClick = null) => {
    let stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <span
          key={i}
          className="text-yellow-500 cursor-pointer"
          onClick={() => onClick && onClick(i)}
        >
          <FaStar />
        </span>
      );
    }
    return (
      <div className="flex flex-row justify-end gap-1">
        {stars}
      </div>
    );
  };

  const RatingBar = ({ stars }) => (
    <div className="flex items-end gap-2 w-60">
      <span className="text-sm font-semibold">{renderStars2(stars)}</span>
      <div className="w-full bg-gray-200 rounded-full">
        <div
          className="bg-violet-800 h-2 rounded-full"
          style={{ width: `${calculatePercentage(countRatings(stars))}%` }}
        ></div>
      </div>
      <span className="text-sm font-semibold">{`${calculatePercentage(countRatings(stars))}%`}</span>
    </div>
  );

  return (
    <div className="my-7">
    <div className="flex items-center gap-2 text-black">
      <div className="flex flex-col items-start gap-2 mr-5">
        <div className="text-4xl font-bold">{averageRating.toFixed(2)}</div>
        <div className="flex gap-1">{renderStars(averageRating)}</div>
        <div className="text-sm">{`${totalRatings} valoraciones`}</div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        {[5, 4, 3, 2, 1].map((stars) => (
          <RatingBar key={stars} stars={stars} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default RatingStats;
