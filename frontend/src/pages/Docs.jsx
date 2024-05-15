import React from "react";
import comingsoon from "../assets/comingsoon.png";

function Docs() {
  return (
    <div className="w-screen flex flex-col md:flex-row items-center justify-evenly h-screen bg-gray-900">
      <div className="w-full md:w-4/5  md:h-4/5  flex flex-col items-center justify-start rounded-xl p-2 md:p-5 shadow-2xl bg-customgray-dark">
        <img src={comingsoon} alt="" />
      </div>
    </div>
  );
}

export default Docs;
