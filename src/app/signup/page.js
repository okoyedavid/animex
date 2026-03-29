"use client";

import { useEffect, useState } from "react";
import SignUp from "../../components/Signup";
import { useRandomBackground } from "../../hooks/useRandomBackground";
import validationRegex from "../../utils/Validation";

export default function SignUpPage() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const backgroundImage = useRandomBackground();

  useEffect(() => {
    setErrorMessage("");
  }, [userInfo.name, userInfo.email, userInfo.password]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { USER, PWD, EMAIL } = validationRegex;
    const isValidSignUp =
      USER.test(userInfo.name) &&
      PWD.test(userInfo.password) &&
      EMAIL.test(userInfo.email);

    if (!isValidSignUp) {
      setErrorMessage("The form was not properly filled.");
      setSuccess(false);
      return;
    }

    setErrorMessage("");
    setSuccess(true);
  };

  return (
    <SignUp
      success={success}
      errorMessage={errorMessage}
      handleSubmit={handleSubmit}
      userInfo={userInfo}
      handleChange={handleChange}
      backgroundImage={backgroundImage}
    />
  );
}
