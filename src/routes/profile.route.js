import { Router } from "express";

import { requireToken } from "../middlewares/requireToken.js";
import {
  getInfoUser,
  getRefreshToken,
} from "../controllers/profile.controller.js";

const router = Router();

router.get("/refresh", getRefreshToken);
router.get("/profile", requireToken, getInfoUser);

export default router;
