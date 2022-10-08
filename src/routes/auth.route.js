import { Router } from "express";

import { rulesRegister, rulesLogin } from "../helpers/rules.js";
import { validationRes } from "../middlewares/validationRes.js";
import { requireToken } from "../middlewares/requireToken.js";

import {
  login,
  logout,
  register,
  getRefreshToken,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", rulesLogin, validationRes, login);
router.post("/register", rulesRegister, validationRes, register);
router.get("/logout", requireToken, logout);
router.get("/refresh", getRefreshToken);

export default router;
