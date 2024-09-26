import { useEffect, useState } from "react";
import InputField from "../input";
import validation_Regex from "../utils/Validation";
import Logo from "../common/Logo";
import SignInfo from "../common/SignInfo";
import Button from "../common/Button";
import AuthContainer from "./AuthContainer";

const { USER, PWD } = validation_Regex;

const SignIn = ({ backgroundImage, handleChange, userInfo, handleSubmit }) => {
  useEffect(() => {
    setValidName(USER.test(userInfo.name));
    setValidPwd(PWD.test(userInfo.password));
  }, [userInfo]);

  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  return (
    <div className="containers" style={{ backgroundImage }}>
      <Logo />
      <AuthContainer
        signInfo={
          <SignInfo
            link="/signUp"
            member="want to become a member?"
            label="Sign up"
          />
        }
        handleSubmit={(e) => handleSubmit(e, "signIn")}
      >
        <InputField
          name="name"
          type="text"
          value={userInfo.name}
          onChange={handleChange}
          valid={validName}
          placeholder="Name"
          errorMsg="your name must be atleast 4 characters "
        />

        <InputField
          name="password"
          type="password"
          value={userInfo.password}
          onChange={handleChange}
          valid={validPwd}
          placeholder="Password"
          errorMsg={`Password must be atleast 6 characters long must include a capital letter, symbol and one number `}
        />

        <Button disabled={!validName || !validPwd} label="Create Account" />
      </AuthContainer>
    </div>
  );
};

export default SignIn;
