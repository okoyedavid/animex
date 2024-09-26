import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./loading.css";

const Loading = () => {
  const skeletons = Array.from({ length: 12 });
  return (
    <ul className="loading">
      {skeletons.map((_, index) => (
        <li key={index} className="loading-item">
          <Skeleton
            height="80%"
            width="100%"
            baseColor="#2c2c2c" // darker base color
            highlightColor="#3c3c3c"
          />
          <Skeleton
            height={20}
            width="80%"
            baseColor="#2c2c2c" // darker base color
            highlightColor="#3c3c3c"
          />
        </li>
      ))}
    </ul>
  );
};

export default Loading;
