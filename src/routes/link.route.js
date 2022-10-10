import { Router } from "express";

import { requireToken } from "../middlewares/requireToken.js";
import { rulesLink, rulesParamsLink } from "../helpers/rules.js";

import {
  getLinks,
  getLink,
  createLink,
  updateLink,
  deleteLink,
} from "../controllers/link.controller.js";

const router = Router();

router.get("/", requireToken, getLinks);
router.get("/:id", requireToken, rulesParamsLink, getLink);
router.post("/", requireToken, rulesLink, createLink);
router.patch("/:id", requireToken, rulesParamsLink, rulesLink, updateLink);
router.delete("/:id", requireToken, rulesParamsLink, deleteLink);

export default router;
