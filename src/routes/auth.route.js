import { Router } from "express";

import { rulesRegister, rulesLogin } from "../helpers/rules.js";
import { validationRes } from "../middlewares/validationRes.js";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", rulesLogin, validationRes, login);
router.post("/register", rulesRegister, validationRes, register);

export default router;
