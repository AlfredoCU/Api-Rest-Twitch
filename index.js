import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import "./src/database/connect.js";
import authRouter from "./src/routes/auth.route.js";
import profileRouter from "./src/routes/profile.route.js";
import linkRouter from "./src/routes/link.route.js";

const whiteList = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      const validMode =
        process.env.MODO === "developer"
          ? !origin || whiteList.includes(origin)
          : whiteList.includes(origin);

      if (validMode) {
        return callback(null, origin);
      }

      return callback(`Error de CORS origin: ${origin} no autorizado`);
    },
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", profileRouter);
app.use("/api/v1/links", linkRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
