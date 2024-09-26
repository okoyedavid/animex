import { useEffect, useState } from "react";
import InputField from "../input";
import validation_Regex from "../utils/Validation";
import Logo from "../common/Logo";
import SignInfo from "../common/SignInfo";
import AuthContainer from "./AuthContainer";
import Button from "../common/Button";

const { USER, PWD, EMAIL } = validation_Regex;

const SignUp = ({ handleSubmit, userInfo, handleChange, backgroundImage }) => {
  useEffect(() => {
    setValidName(USER.test(userInfo.name));
    setValidPwd(PWD.test(userInfo.password));
    setValidEmail(EMAIL.test(userInfo.email));
  }, [userInfo]);

  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  return (
    <div className="containers" style={{ backgroundImage }}>
      <Logo />
      <AuthContainer
        signInfo={
          <SignInfo link="/signIn" member="Already a member?" label="Login">
            <p>START FOR FREE</p>
            <h1>Create new account</h1>
          </SignInfo>
        }
        handleSubmit={(e) => handleSubmit(e, "signUp")}
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
          name="email"
          type="email"
          value={userInfo.email}
          onChange={handleChange}
          valid={validEmail}
          placeholder="Email"
          errorMsg="Email is not correct"
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
        <Button
          disabled={!validName || !validPwd || !validEmail}
          label="Create Account"
        />
      </AuthContainer>
    </div>
  );
};

export default SignUp;
