import { User } from "../models/User.js";
import { codeErrors } from "../constants/codeErrors.js";
import { infoMessages } from "../constants/infoMessages.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const validPassword = !!user ? await user.comparePassword(password) : false;

    if (!user || !validPassword) {
      return res.status(403).json({ error: infoMessages.userNotFound });
    }

    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.status(200).json({ token, expiresIn });
  } catch (error) {
    console.log("LOGIN_CONTROLLER_ERROR", error);
    return res.status(500).json({ error: infoMessages.serverError });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });

    await user.save();

    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.status(201).json({ token, expiresIn });
  } catch (error) {
    console.log("REGISTER_CONTROLLER_ERROR", error);

    if (error.code in codeErrors) {
      return res
        .status(400)
        .json({ code: error.code, error: codeErrors[error.code] });
    }

    return res.status(500).json({ error: infoMessages.serverError });
  }
};

export const logout = (_, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("LOGOUT", error);
    return res.status(500).json({ error: infoMessages.serverError });
  }
};

export const getRefreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.status(200).json({ token, expiresIn });
  } catch (error) {
    console.log("GET_REFRESH_TOKEN", error);
    return res.status(500).json({ error: infoMessages.serverError });
  }
};
