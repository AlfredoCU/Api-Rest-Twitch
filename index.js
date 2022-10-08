import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

import "./src/database/connect.js";
import authRouter from "./src/routes/auth.route.js";
import profileRouter from "./src/routes/profile.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", profileRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
