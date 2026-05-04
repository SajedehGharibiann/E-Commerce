import React, { useState } from "react";
import FirstStep from "./FirstStep";
import ForgotPassword from "./ForgotPassword";
import LoginOtp from "./LoginOtp";
import LoginPassword from "./LoginPassword";

export default function Auth() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [pageType, setPageType] = useState("first");
  return (
    <>
      {pageType === "first" ? (
        <FirstStep
          phoneNumber={phoneNumber}
          changePageType={setPageType}
          changePhoneNumber={setPhoneNumber}
        />
      ) : pageType === "forgot" ? (
        <ForgotPassword changePageType={setPageType}/>
      ) : pageType === "password" ? (
        <LoginPassword
          phoneNumber={phoneNumber}
          changePageType={setPageType}
          changePhoneNumber={setPhoneNumber}
        />
      ) : pageType === "otp"? (
        <LoginOtp
          phoneNumber={phoneNumber}
          changePageType={setPageType}
          changePhoneNumber={setPhoneNumber}
        />
      ):console.log("first")}
    </>
  );
}
