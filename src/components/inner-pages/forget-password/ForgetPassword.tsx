"use client";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import EmailOTPInput from "./EmaillOTPInput";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/components/common/BreadCrumb";
import VerifyOtp from "./VerifyOtp";
import { toast } from "react-toastify";
import ResetPassword from "./ResetPassword";
import {
  addNewUserPassword,
  otpGenerator,
  verifyOtp,
} from "@/components/server/auth/auth";
import { error } from "console";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [resetPassword, setResetPassword] = useState({
    userId: "",
    otpId: "",
    password: "",
  });
  useEffect(() => {
    const user = localStorage.getItem("kanchan-user");
    if (user) {
      const USER = JSON.parse(user);
      setEmail(USER.email);
    }
  }, []);

  const sendOTP = async (email: string) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    otpGenerator({ email: email })
      .then((data) => {
        setStep(2);
        toast.success("OTP sent successfully!");
        setEmail(email);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    console.log(email);
  };

  const handleVerify = async (otp: any) => {
    const finalOtp = otp.join("");
    if (finalOtp.length === 5) {
      console.log("email:" + email);

      verifyOtp({ email: email, OTP: finalOtp })
        .then((data) => {
          console.log(data);
          setResetPassword((prev) => ({
            ...prev,
            userId: data.user._id,
            otpId: data.otpId,
          }));
          setStep(3);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("Please enter a 5-digit OTP.");
    }
  };

  const resetUserPassword = async (password: string) => {
    // setResetPassword({
    setResetPassword((prev) => ({
      ...prev,
      password: password,
    }));
    // console.log(passowrd);

    const reset = { ...resetPassword, password: password };
    addNewUserPassword(reset)
      .then((data) => {
        console.log(data);
        toast.success("Password changed successfully!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
    // console.log({ ...resetPassword, password: password });
  };

  return (
    <div>
      <HeaderOne headerTop={false} />
      {/* sdfouhdfu */}
      <BreadCrumb title="Forget Password" />
      {step === 1 && <EmailOTPInput Email={email} onSendOTP={sendOTP} />}
      {step === 2 && <VerifyOtp email={email} handleVerify={handleVerify} />}
      {step === 3 && <ResetPassword resetUserPassword={resetUserPassword} />}

      <FooterOne />
    </div>
  );
};

export default ForgetPassword;
