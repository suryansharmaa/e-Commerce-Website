import express, { json } from "express";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth/authRoute.js";

// Connecting to the Database

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

connect(
  "mongodb+srv://bitofsol:mongoDBpassword@learningmern.ou9gf.mongodb.net/"
)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(json());
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server is now running at port ${PORT}`));
