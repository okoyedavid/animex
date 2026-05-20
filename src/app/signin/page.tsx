"use client";

import { useState, type ChangeEvent } from "react";

import SignIn from "@/components/SignIn";
import { useRandomBackground } from "@/hooks/useRandomBackground";

type SignInUserInfo = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const [userInfo, setUserInfo] = useState<SignInUserInfo>({
    email: "",
    password: "",
  });
  const backgroundImage = useRandomBackground();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <SignIn
      userInfo={userInfo}
      handleChange={handleChange}
      backgroundImage={backgroundImage}
    />
  );
}
