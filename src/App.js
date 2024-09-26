import React, { useState, useEffect } from "react";
import "./styles.css";
import SignUp from "./components/Signup";
import validation_Regex from "./utils/Validation";
import { Route, Routes } from "react-router";
import SignIn from "./components/SignIn";
import Animex from "./components/Animex";

function App() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [backgroundImage, setBackgroundImage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [userInfo.name, userInfo.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e, signin) => {
    e.preventDefault();
    const { USER, PWD, EMAIL } = validation_Regex;

    if (signin === "signIn") {
      const isValidSignIn =
        USER.test(userInfo.name) && PWD.test(userInfo.password);

      console.log(isValidSignIn);

      if (isValidSignIn) {
        setErrMsg("Error password was not correct");
        return;
      }
    }

    if (signin === "signUp") {
      const isValidSignUp =
        USER.test(userInfo.name) &&
        PWD.test(userInfo.password) &&
        EMAIL.test(userInfo.email);

      if (!isValidSignUp) {
        setErrMsg("The Form was not properly filled");
        console.log(errMsg);
        return;
      }

      setSuccess(true);
    }
  };

  useEffect(() => {
    const No = Math.round(Math.random() * 5) + 1;
    setBackgroundImage(`url('/download${No}.jpeg')`);
  }, []);

  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <SignUp
            success={success}
            handleSubmit={handleSubmit}
            userInfo={userInfo}
            handleChange={handleChange}
            backgroundImage={backgroundImage}
          />
        }
      />
      <Route
        path="/signin"
        element={
          <SignIn
            success={success}
            handleSubmit={handleSubmit}
            userInfo={userInfo}
            handleChange={handleChange}
            backgroundImage={backgroundImage}
          />
        }
      />

      <Route path="/" element={<Animex backgroundImage={backgroundImage} />} />
    </Routes>
  );
}

export default App;
