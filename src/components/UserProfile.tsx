import React, { useEffect } from "react";
import { users } from "../assets";

type PropsType = {
  turn: boolean;
  name: string;
  job: string;
};

const UserProfile: React.FC<PropsType> = (props) => {
  useEffect(() => {}, [props.turn]);
  return (
    <div
      className={`w-full border-gray-200 rounded-lg shadow ${
        props.turn ? "bg-green-600" : "bg-white border"
      }`}
    >
      <div className="flex justify-center md:justify-between p-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <img
            className="w-14 h-1w-14 md:w-24 md:h-24 md:mb-3 rounded-full shadow-lg"
            src={users}
            alt="Bonnie image"
          />
          <div className="flex flex-col justify-center md:justify-start">
            <h5
              className={`mb-1 text-lg md:text-xl font-medium ${
                props.turn ? "text-white" : "text-gray-900"
              }`}
            >
              {props.name}
            </h5>
            <span
              className={`text-xs md:text-sm ${
                props.turn ? "text-gray-200" : "text-gray-500"
              }`}
            >
              {props.job}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
