import jwt from "jsonwebtoken";

import { codeErrors } from "../constants/codeErrors.js";

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new Error(codeErrors["not token"]);

    const { uid } = jwt.verify(refreshToken, process.env.JWT_REFRESH);
    req.uid = uid;

    next();
  } catch (error) {
    console.log("REQUIRE_REFRESH_TOKEN_ERROR", error);
    return res.status(401).json({ error: codeErrors[error.message] });
  }
};
