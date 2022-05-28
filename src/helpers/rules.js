import { body, check } from "express-validator";

import {
  rgxIsUpper,
  rgxIsLower,
  rgxIsNumber,
  rgxPassword,
  rgxIsSpecial,
  confirmPassword,
} from "./validations.js";

const emailFormant = body("email", "Formato de correo incorrecto")
  .trim()
  .isEmail()
  .normalizeEmail();

export const rulesRegister = [
  emailFormant,
  check("password")
    .matches(rgxPassword)
    .withMessage("Contraseña no válida")
    .isLength({ min: 8 })
    .withMessage("8 carácteres")
    .matches(rgxIsUpper)
    .withMessage("Una mayúscula")
    .matches(rgxIsLower)
    .withMessage("Una minúscula")
    .matches(rgxIsSpecial)
    .withMessage("Un caráter especial")
    .matches(rgxIsNumber)
    .withMessage("Un número"),
  body("confirmPassword").custom(confirmPassword),
];

export const rulesLogin = [
  emailFormant,
  check("password").matches(rgxPassword).withMessage("Contraseña no válida"),
];
