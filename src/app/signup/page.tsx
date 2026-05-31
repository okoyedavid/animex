"use client";

import { useState, type ChangeEvent } from "react";

import SignUp from "@/components/Signup";
import { useRandomBackground } from "@/hooks/useRandomBackground";

type SignUpUserInfo = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const [userInfo, setUserInfo] = useState<SignUpUserInfo>({
    name: "",
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
    <SignUp
      userInfo={userInfo}
      handleChange={handleChange}
      backgroundImage={backgroundImage}
    />
  );
}
