import React from "react";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Demo from "./Demo";
import OTPVerification from "./OTPVerification";

function Main() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
      </Routes>
    </>
  );
}

export default Main;
