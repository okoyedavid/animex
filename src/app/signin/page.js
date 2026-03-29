"use client";

import { useEffect, useState } from "react";
import SignIn from "../../components/SignIn";
import { useRandomBackground } from "../../hooks/useRandomBackground";
import validationRegex from "../../utils/Validation";

export default function SignInPage() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const backgroundImage = useRandomBackground();

  useEffect(() => {
    setErrorMessage("");
  }, [userInfo.name, userInfo.password]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { USER, PWD } = validationRegex;
    const isValidSignIn =
      USER.test(userInfo.name) && PWD.test(userInfo.password);

    if (!isValidSignIn) {
      setErrorMessage("Name or password is not in the expected format.");
      return;
    }

    setErrorMessage("Error password was not correct");
  };

  return (
    <SignIn
      errorMessage={errorMessage}
      handleSubmit={handleSubmit}
      userInfo={userInfo}
      handleChange={handleChange}
      backgroundImage={backgroundImage}
    />
  );
}
