import { Link } from "react-router-dom";

const SignInfo = ({ children, link, member, label }) => {
  return (
    <>
      {children}
      <p>
        {member}
        <span>
          <Link to={link}>{label} </Link>
        </span>
      </p>
    </>
  );
};

export default SignInfo;
