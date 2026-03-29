import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const showError = focus && !valid && value.length > 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="text-sm font-medium tracking-wide text-slate-100"
        >
          {placeholder}
        </label>
        {value ? (
          <span
            className={`text-xs font-medium ${
              valid ? "text-emerald-300" : "text-amber-200"
            }`}
          >
            {valid ? "Looks good" : "Needs attention"}
          </span>
        ) : null}
      </div>

      <div className="relative">
      <input
        id={name}
        name={name}
        type={inputType}
        className={`min-h-14 w-full rounded-2xl border bg-white/5 px-4 ${isPassword ? "pr-14" : "pr-4"} text-white outline-none transition placeholder:text-slate-400 ${
          showError
            ? "border-danger/80 ring-4 ring-danger/10"
            : "border-white/10 focus:border-accent-soft focus:ring-4 focus:ring-accent/10"
        }`}
        placeholder={placeholder}
        value={value}
        autoComplete={isPassword ? "current-password" : "off"}
        onChange={onChange}
        aria-invalid={valid ? "false" : "true"}
        aria-describedby="note"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />

      {isPassword ? (
        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          className="absolute inset-y-0 right-4 inline-flex items-center text-slate-300 transition hover:text-white"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      ) : null}
      </div>

      <div
        id="note"
        className={`text-sm leading-6 transition ${
          showError ? "text-danger" : "hidden"
        }`}
      >
        {errorMsg}
      </div>
    </div>
  );
};

export default InputField;
