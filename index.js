import "dotenv/config";
import express from "express";

import "./src/database/connect.js";
import authRouter from "./src/routes/auth.route.js";

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
