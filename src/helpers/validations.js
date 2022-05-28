export const rgxIsNumber = /\d+/;
export const rgxIsUpper = /[A-Z]/;
export const rgxIsLower = /[a-z]/;
export const rgxIsSpecial = /[^\w\s:]/;

export const rgxPassword =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/;

export const confirmPassword = (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error("La contraseña no coincide.");
  }

  return true;
};
