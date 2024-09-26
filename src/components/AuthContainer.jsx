function AuthContainer({ children, signInfo, handleSubmit }) {
  return (
    <div className="main">
      {signInfo}
      <form onSubmit={handleSubmit}>{children}</form>
    </div>
  );
}

export default AuthContainer;
