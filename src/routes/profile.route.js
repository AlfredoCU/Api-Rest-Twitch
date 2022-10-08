import { Router } from "express";

import { requireToken } from "../middlewares/requireToken.js";
import { getInfoUser } from "../controllers/profile.controller.js";

const router = Router();

router.get("/profile", requireToken, getInfoUser);

export default router;
