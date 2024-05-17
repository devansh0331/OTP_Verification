import React, { useState } from "react";
import demo from "../assets/demo.png";
import { Input } from "@material-tailwind/react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import validator from "validator";

function Demo() {
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email != "") {
      if (!validator.isEmail(email)) {
        toast.error("Please enter a valid email address");
      } else {
        // setVisible(true);
        if (email.slice("@")[1] != "gmail") {
          toast.error("Please enter a valid gmail address");
          // setVisible(false);
        } else {
          try {
            setVisible(true);
            const response = await fetch(
              "https://otp-verification-gg3p.onrender.com/otp/sendOTP",
              // "http://localhost:8000/otp/sendOTP",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
              }
            );
            const data = await response.json();
            console.log(data);

            if (data.success) {
              setVisible(false);
              toast.success("OTP sent successfully! Check your Email");
              setTimeout(() => {
                navigate(`/otp-verification?email=${email}`);
              }, 2000);
            } else {
              toast.error(data.error);
            }
          } catch (error) {
            toast.error(error);
          }
        }
      }
    } else {
      toast.error("Please enter your email");
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
          <div className="w-full flex flex-col md:flex-row items-center justify-between md:justify-between text-xl mt-3">
            <button
              onClick={handleSubmit}
              className="w-full md:w-2/5 bg-red-600 text-white px-5 py-1 rounded-md hover:bg-red-900 mt-3 md:mr-5 mb-5 md:mb-0"
            >
              Submit
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

export default Demo;
