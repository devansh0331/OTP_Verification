import React from "react";
import error from "../assets/error.png";

function PageNotFound() {
  return (
    <div className="w-screen flex flex-col md:flex-row items-center justify-evenly h-screen bg-gray-900">
      <div className="w-full md:w-4/5  md:h-4/5  flex flex-col items-center justify-start rounded-xl p-2 md:p-5 shadow-2xl bg-customgray-dark">
        <img src={error} alt="" className="h-3/5" />
        <h1 className="text-4xl md:text-5xl text-left font-bold text-red-600">
          Page Not Found !
        </h1>
      </div>
    </div>
  );
}

export default PageNotFound;
