import { User } from "../models/User.js";
import { codeErrors } from "../constants/codeErrors.js";
import { infoMessages } from "../constants/infoMessages.js";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const validPassword = !!user ? await user.comparePassword(password) : false;

    if (!user || !validPassword) {
      return res.status(403).json({ message: infoMessages.userNotFound });
    }

    const { token, expiresIn } = generateToken(user.id);
    return res.status(200).json({ token, expiresIn });
  } catch (error) {
    console.log("LOGIN_CONTROLLER_ERROR", error);

    return res.status(500).json({ message: infoMessages.serverError });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });

    await user.save();

    return res.status(201).json({ success: true });
  } catch (error) {
    console.log("REGISTER_CONTROLLER_ERROR", error);

    if (error.code in codeErrors) {
      return res
        .status(400)
        .json({ code: error.code, message: codeErrors[error.code] });
    }

    return res.status(500).json({ message: infoMessages.serverError });
  }
};
