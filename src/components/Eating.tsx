import React, { useEffect } from "react";
import { getImageAlt, getImageSrc } from "../assets";

type PropsType = {
  data: string[];
};

const Eating: React.FC<PropsType> = (props) => {
  useEffect(() => {}, [props.data]);
  return (
    <div className="w-full h-max flex flex-wrap max-w-xl mx-auto">
      {props.data.map((item, index) => (
        <img
          key={index}
          className="w-6 md:w-10 object-scale-down aspect-square"
          src={getImageSrc(item)}
          alt={getImageAlt(item)}
        />
      ))}
    </div>
  );
};

export default Eating;
