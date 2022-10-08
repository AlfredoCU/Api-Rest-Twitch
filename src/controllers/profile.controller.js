import jwt from "jsonwebtoken";

import { User } from "../models/User.js";
import { infoMessages } from "../constants/infoMessages.js";
import { codeErrors } from "../constants/codeErrors.js";
import { generateToken } from "../utils/tokenManager.js";

export const getInfoUser = async (req, res) => {
  try {
    // Al agregar lean() le quitamos todo tipo de funcionalidad de mongoose, devolviendo un objeto más liviano.
    // Esto hace que debas obtener la propiedad como user._id y no como user.id
    const user = await User.findById(req.uid).lean();
    return res.status(200).json({ uid: user._id, email: user.email });
  } catch (error) {
    console.log("GET_USER_ERROR", error);
    res.status(500).json({ error: infoMessages.serverError });
  }
};

export const getRefreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new Error(codeErrors["not token"]);

    const { uid } = jwt.verify(refreshToken, process.env.JWT_REFRESH);
    const { token, expiresIn } = generateToken(uid);

    return res.status(200).json({ token, expiresIn });
  } catch (error) {
    console.log("GET_REFRESH_TOKEN", error);
  }
};
