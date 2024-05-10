import React, { useState } from "react";
import demo from "../assets/demo.png";
import { Input } from "@material-tailwind/react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Demo() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/otp/sendOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log(data);

      if (data.success) {
        toast.success("OTP sent successfully! Check your Email");
        navigate(`/otp-verification?email=${email}`);
      } else {
        toast.error("Server Error: " + data.error);
      }
    } catch (error) {
      toast.error("Client Error: " + error);
    }
  };

  return (
    <div className="w-screen flex flex-col md:flex-row items-center justify-center h-screen bg-gray-900">
      <div className="w-full md:w-4/5 h-4/5 md:flex:1 flex flex-col md:flex-row items-center justify-evenly rounded-xl p-2 md:p-5 shadow-2xl bg-customgray-dark">
        <img src={demo} alt="" className="h-auto hidden md:block" />
        <div className="w-full">
          <h1 className="text-4xl md:text-5xl text-left font-bold text-red-600">
            Enter Your Email
          </h1>
          <h1 className="text-xl text-left text-white">
            Make sure to enter the valid email address
          </h1>
          <div className="mt-5">
            <Input
              color="red"
              className="text-white"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col md:flex-row items-center justify-evenly md:justify-start text-xl mt-3">
            <button
              onClick={handleSubmit}
              className="w-full md:w-2/5 bg-red-600 text-white px-5 py-1 rounded-md hover:bg-red-900 mt-3"
            >
              Submit
            </button>
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default Demo;
