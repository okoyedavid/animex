import React, { useState } from "react";

const InputField = ({
  name,
  value,
  onChange,
  valid,
  placeholder,
  errorMsg,
  type,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="form-group">
      <input
        name={name}
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onChange={onChange}
        aria-invalid={valid ? "false" : "true"}
        aria-describedby="note"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <div>
        <div
          id="note"
          className={focus && !valid ? "alert alert-danger" : "instructions"}
        >
          {errorMsg}
        </div>
      </div>
    </div>
  );
};

export default InputField;
