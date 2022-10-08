import jwt from "jsonwebtoken";

import { codeErrors } from "../constants/codeErrors.js";

export const requireToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("not token");

    const token = authorization.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    console.log("REQUIRE_TOKEN_ERROR", error);
    return res.status(401).json({ error: codeErrors[error.message] });
  }
};
