const validationRegex = {
  USER: /[A-Za-z]{3,23}$/,
  PWD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export default validationRegex;
