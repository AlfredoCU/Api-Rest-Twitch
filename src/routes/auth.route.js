import { Router } from "express";

import { rulesRegister, rulesLogin } from "../helpers/rules.js";

import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";

import {
  login,
  logout,
  register,
  getRefreshToken,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", rulesLogin, login);
router.post("/register", rulesRegister, register);
router.get("/logout", requireToken, logout);
router.get("/refresh", requireRefreshToken, getRefreshToken);

export default router;
