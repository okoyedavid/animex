const Button = ({ disabled, style = "btn btn-primary", label }) => {
  return (
    <button disabled={disabled} className={style} aria-disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
