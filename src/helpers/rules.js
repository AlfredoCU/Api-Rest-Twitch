import axios from "axios";
import { body, check, param } from "express-validator";

import { validationRes } from "../middlewares/validationManager.js";

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
  validationRes,
];

export const rulesLogin = [
  emailFormant,
  check("password").matches(rgxPassword).withMessage("Contraseña no válida"),
  validationRes,
];

export const rulesLink = [
  body("longLink", "Formato de link incorrecto")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        await axios.get(value);
        return value;
      } catch (error) {
        console.log("RULES_LINK", error);
        throw new Error("Link no encontrado - Error 404");
      }
    }),
  validationRes,
];

export const rulesParamsLink = [
  param("id", "Formato de id incorrecto").trim().notEmpty().escape(),
  validationRes,
];
