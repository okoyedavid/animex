const validationRegex = {
  USER: /^[A-z][A-z0-9-_]{3,23}$/,
  PWD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export default validationRegex;
