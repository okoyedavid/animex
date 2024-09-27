const Logo = ({ children, className = "" }) => {
  return (
    <>
      <h2 className={className}>Animex</h2>
      {children}
    </>
  );
};

export default Logo;
