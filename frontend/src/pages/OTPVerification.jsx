import React, { useState } from "react";
import demo from "../assets/otp-verification.png";
import { Input } from "@material-tailwind/react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { SuccessPopup } from "./SuccessPopup";

function OTPVerification() {
  const [serarchParams] = useSearchParams();

  const navigate = useNavigate();

  const [otp, setOTP] = useState("");

  const [visible, setVisible] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setVisible(true);
      const email = serarchParams.get("email");
      const response = await fetch(
        "https://otp-verification-gg3p.onrender.com/otp/verifyOTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.success) {
        setVisible(false);
        setOpen(true);
        // toast.success("OTP Successfully Verified");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="w-screen flex flex-col md:flex-row items-center justify-center h-screen bg-gray-900">
      <SuccessPopup
        open={open}
        handleHome={() => navigate("/")}
        handleReadDocs={() => navigate("/docs")}
        handleOpen={handleOpen}
      />
      <div className="w-full md:w-4/5 h-4/5 md:flex:1 flex flex-col md:flex-row items-center justify-evenly rounded-xl p-2 md:p-5 shadow-2xl bg-customgray-dark">
        <img src={demo} alt="" className="h-auto hidden md:block" />
        <div className="w-full">
          <h1 className="text-4xl md:text-5xl text-left font-bold text-red-600">
            Enter Your OTP
          </h1>
          <h1 className="text-xl text-left text-white">
            Once the OTP is entered, it cannot be used again.
          </h1>
          <div className="mt-5">
            <Input
              color="red"
              className="text-white"
              label="OTP"
              type="number"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col md:flex-row items-center justify-evenly md:justify-between text-xl mt-3">
            <button
              onClick={handleSubmit}
              className="w-full md:w-2/5 bg-red-600 text-white px-5 py-1 rounded-md hover:bg-red-900 mt-3"
            >
              Verify
            </button>
            <Triangle
              visible={visible}
              // visible={false}
              height="40"
              width="40"
              color="white"
              // color="red"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default OTPVerification;
